import { createHmac, timingSafeEqual } from 'node:crypto'
import type { Config } from '@netlify/functions'
import { and, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { orders } from '../../db/schema.js'

type PaystackWebhook = {
  event?: string
  data?: {
    status?: string
    amount?: number
    reference?: string
    currency?: string
    paid_at?: string
  }
}

const hasValidSignature = (body: string, signature: string | null, secretKey: string) => {
  if (!signature || !/^[a-f\d]{128}$/i.test(signature)) return false

  const expected = createHmac('sha512', secretKey).update(body).digest()
  const received = Buffer.from(signature, 'hex')
  return received.length === expected.length && timingSafeEqual(received, expected)
}

export default async (request: Request) => {
  if (request.method !== 'POST') return Response.json({ message: 'Method not allowed.' }, { status: 405 })

  const secretKey = Netlify.env.get('PAYSTACK_SECRET_KEY')
  if (!secretKey) return Response.json({ message: 'Payment service is not configured.' }, { status: 503 })

  const rawBody = await request.text()
  if (!hasValidSignature(rawBody, request.headers.get('x-paystack-signature'), secretKey)) {
    return Response.json({ message: 'Invalid signature.' }, { status: 401 })
  }

  let payload: PaystackWebhook
  try {
    payload = JSON.parse(rawBody) as PaystackWebhook
  } catch {
    return Response.json({ message: 'Invalid webhook payload.' }, { status: 400 })
  }

  if (payload.event !== 'charge.success') return Response.json({ received: true })

  const transaction = payload.data
  const reference = transaction?.reference
  if (!reference) return Response.json({ message: 'Payment reference is missing.' }, { status: 400 })

  try {
    const [order] = await db.select().from(orders).where(eq(orders.reference, reference)).limit(1)
    if (!order) return Response.json({ message: 'Order reference was not found.' }, { status: 404 })
    if (order.paid) return Response.json({ received: true })

    const validTransaction = transaction.status === 'success'
      && transaction.reference === order.reference
      && transaction.currency === 'NGN'
      && transaction.amount === order.total * 100

    if (!validTransaction) return Response.json({ message: 'Payment details could not be validated.' }, { status: 400 })

    const paidAt = transaction.paid_at ? new Date(transaction.paid_at) : new Date()
    await db.update(orders)
      .set({ paid: true, paystackStatus: transaction.status, paidAt: Number.isNaN(paidAt.getTime()) ? new Date() : paidAt })
      .where(and(eq(orders.reference, order.reference), eq(orders.paid, false)))

    return Response.json({ received: true })
  } catch {
    return Response.json({ message: 'Webhook processing could not be completed.' }, { status: 500 })
  }
}

export const config: Config = { path: '/api/paystack/webhook', method: 'POST' }
