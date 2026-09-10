import type { Config } from '@netlify/functions'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { orders } from '../../db/schema.js'

export default async (request: Request) => {
  if (request.method !== 'POST') return Response.json({ message: 'Method not allowed.' }, { status: 405 })
  const secretKey = Netlify.env.get('PAYSTACK_SECRET_KEY')
  if (!secretKey) return Response.json({ message: 'Payment service is not configured.' }, { status: 503 })
  try {
    const { reference } = await request.json() as { reference?: string }
    if (!reference || !/^CCC-[A-Za-z0-9-]+$/.test(reference)) return Response.json({ message: 'Invalid payment reference.' }, { status: 400 })
    const [order] = await db.select().from(orders).where(eq(orders.reference, reference)).limit(1)
    if (!order) return Response.json({ message: 'Order reference was not found.' }, { status: 404 })
    if (order.paid) return Response.json({ verified: true, order: { reference: order.reference, total: order.total } })

    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers: { authorization: `Bearer ${secretKey}` } })
    const result = await response.json() as { status: boolean; message: string; data?: { status: string; amount: number; reference: string; currency: string; paid_at?: string } }
    const verified = response.ok && result.status && result.data?.status === 'success' && result.data.reference === reference && result.data.currency === 'NGN' && result.data.amount === order.total * 100
    if (!verified) return Response.json({ verified: false, message: 'Paystack has not confirmed this payment.' }, { status: 402 })

    await db.update(orders).set({ paid: true, paystackStatus: result.data?.status ?? 'success', paidAt: result.data?.paid_at ? new Date(result.data.paid_at) : new Date() }).where(eq(orders.reference, reference))
    return Response.json({ verified: true, order: { reference: order.reference, total: order.total } })
  } catch {
    return Response.json({ verified: false, message: 'Payment verification could not be completed.' }, { status: 500 })
  }
}

export const config: Config = { path: '/api/paystack/verify', method: 'POST' }
