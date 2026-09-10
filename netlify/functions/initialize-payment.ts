import type { Config } from '@netlify/functions'
import { db } from '../../db/index.js'
import { orders } from '../../db/schema.js'
import products from '../../src/data/products.js'

type RequestItem = { productId: number; quantity: number }
type Customer = { fullName: string; email: string; phone: string; address: string; city: string; state: string; note?: string }

export default async (request: Request) => {
  if (request.method !== 'POST') return Response.json({ message: 'Method not allowed.' }, { status: 405 })
  const secretKey = Netlify.env.get('PAYSTACK_SECRET_KEY')
  if (!secretKey) return Response.json({ message: 'Payment service is not configured.' }, { status: 503 })

  try {
    const body = await request.json() as { customer?: Customer; items?: RequestItem[] }
    const customer = body.customer
    if (!customer || !customer.fullName || !customer.email || !customer.phone || !customer.address || !customer.city || !customer.state || !Array.isArray(body.items) || !body.items.length) {
      return Response.json({ message: 'Complete your delivery details and cart before paying.' }, { status: 400 })
    }

    const orderItems = body.items.map((requested) => {
      const product = products.find((item) => item.id === Number(requested.productId))
      const quantity = Math.floor(Number(requested.quantity))
      if (!product || !product.inStock || quantity < 1 || quantity > product.stockQuantity) throw new Error('One or more cart items are unavailable. Please refresh your cart.')
      const unitPrice = Math.round(product.price * (1 - product.discount / 100))
      return { productId: product.id, name: product.name, quantity, unitPrice, image: product.image }
    })
    const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const deliveryFee = subtotal >= 100000 ? 0 : 2500
    const total = subtotal + deliveryFee
    const reference = `CCC-${Date.now()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
    const callbackUrl = Netlify.env.get('PAYSTACK_CALLBACK_URL') || new URL('/order-success', request.url).toString()

    await db.insert(orders).values({ reference, customer, items: orderItems, subtotal, deliveryFee, total })
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: { authorization: `Bearer ${secretKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({ email: customer.email, amount: String(total * 100), currency: 'NGN', reference, callback_url: callbackUrl, metadata: JSON.stringify({ customer_name: customer.fullName, phone: customer.phone, order_reference: reference }) }),
    })
    const paystack = await paystackResponse.json() as { status: boolean; message: string; data?: { authorization_url: string; access_code: string; reference: string } }
    if (!paystackResponse.ok || !paystack.status || !paystack.data) throw new Error(paystack.message || 'Paystack initialization failed.')
    return Response.json({ authorizationUrl: paystack.data.authorization_url, accessCode: paystack.data.access_code, reference })
  } catch (error) {
    return Response.json({ message: error instanceof Error ? error.message : 'Unable to initialize payment.' }, { status: 400 })
  }
}

export const config: Config = { path: '/api/paystack/initialize', method: 'POST' }
