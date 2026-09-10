import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useCart } from '@/context/CartContext'
import { formatNaira } from '@/lib/format'

export const Route = createFileRoute('/checkout')({ component: CheckoutPage, head: () => ({ meta: [{ title: 'Secure Checkout | Chic Charm Collections' }, { name: 'description', content: 'Complete your Chic Charm Collections order securely with Paystack.' }] }) })

type CheckoutForm = { fullName: string; email: string; phone: string; address: string; city: string; state: string; note: string }
const initialForm: CheckoutForm = { fullName: '', email: '', phone: '', address: '', city: '', state: '', note: '' }

function CheckoutPage() {
  const { items, subtotal } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const deliveryFee = subtotal >= 100000 ? 0 : 2500

  if (!items.length) return <section className="shell grid min-h-[60vh] place-items-center text-center"><div><h1 className="font-display text-5xl text-navy">Your cart is empty</h1><p className="mt-3 text-muted">Add something beautiful before checking out.</p><Link to="/search" search={{ q: '' }} className="button-primary mt-7">Browse Products</Link></div></section>

  const update = (field: keyof CheckoutForm, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/paystack/initialize', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customer: form, items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })) }) })
      const data = await response.json() as { authorizationUrl?: string; message?: string }
      if (!response.ok || !data.authorizationUrl) throw new Error(data.message || 'Unable to start payment.')
      window.location.assign(data.authorizationUrl)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to start payment. Please try again.')
      setSubmitting(false)
    }
  }

  return <section className="shell py-10 sm:py-16"><button onClick={() => void navigate({ to: '/cart' })} className="text-link"><ArrowLeft size={16} /> Back to cart</button><div className="mt-7 grid gap-10 lg:grid-cols-[1fr_390px]"><div><p className="eyebrow">Secure checkout</p><h1 className="mt-3 font-display text-5xl text-navy sm:text-6xl">Delivery details</h1><form id="checkout-form" onSubmit={submit} className="mt-8 grid gap-5 rounded-[2rem] bg-white p-5 shadow-card sm:grid-cols-2 sm:p-8"><label className="control-label sm:col-span-2">Full name<input required autoComplete="name" className="field" value={form.fullName} onChange={(event) => update('fullName', event.target.value)} /></label><label className="control-label">Email address<input required type="email" autoComplete="email" className="field" value={form.email} onChange={(event) => update('email', event.target.value)} /></label><label className="control-label">Phone number<input required type="tel" autoComplete="tel" className="field" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label><label className="control-label sm:col-span-2">Delivery address<input required autoComplete="street-address" className="field" value={form.address} onChange={(event) => update('address', event.target.value)} /></label><label className="control-label">City<input required autoComplete="address-level2" className="field" value={form.city} onChange={(event) => update('city', event.target.value)} /></label><label className="control-label">State<input required autoComplete="address-level1" className="field" value={form.state} onChange={(event) => update('state', event.target.value)} /></label><label className="control-label sm:col-span-2">Order note <span className="font-normal text-muted">(optional)</span><textarea rows={4} className="field resize-none" value={form.note} onChange={(event) => update('note', event.target.value)} placeholder="Special delivery instructions" /></label>{error && <p role="alert" className="sm:col-span-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>}</form></div><aside className="h-fit rounded-[2rem] bg-navy p-7 text-cream shadow-luxe lg:sticky lg:top-28"><h2 className="font-display text-3xl">Your Order</h2><div className="mt-6 max-h-72 space-y-4 overflow-auto pr-1">{items.map(({ product, quantity }) => <div key={product.id} className="flex gap-3"><img src={product.image} alt="" className="size-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{product.name}</p><p className="mt-1 text-xs text-cream/50">Qty {quantity}</p></div><strong className="text-sm text-gold">{formatNaira(product.price * (1 - product.discount / 100) * quantity)}</strong></div>)}</div><div className="mt-6 space-y-3 border-y border-white/12 py-5 text-sm"><div className="flex justify-between text-cream/65"><span>Subtotal</span><span>{formatNaira(subtotal)}</span></div><div className="flex justify-between text-cream/65"><span>Delivery fee</span><span>{deliveryFee ? formatNaira(deliveryFee) : 'Free'}</span></div></div><div className="mt-5 flex items-end justify-between"><span>Total</span><strong className="font-display text-3xl text-gold">{formatNaira(subtotal + deliveryFee)}</strong></div><button form="checkout-form" disabled={submitting} className="button-gold mt-7 w-full"><LockKeyhole size={17} />{submitting ? 'Connecting securely…' : 'Pay Now with Paystack'}</button><p className="mt-4 text-center text-[11px] leading-5 text-cream/45">You’ll continue directly to Paystack’s secure payment page.</p></aside></div></section>
}
