import { Link, createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, LoaderCircle, ShieldAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import { formatNaira } from '@/lib/format'

export const Route = createFileRoute('/order-success')({
  validateSearch: (search: Record<string, unknown>) => ({ reference: typeof search.reference === 'string' ? search.reference : typeof search.trxref === 'string' ? search.trxref : '' }),
  component: OrderSuccess,
  head: () => ({ meta: [{ title: 'Order Status | Chic Charm Collections' }] }),
})

type Status = { state: 'loading' | 'success' | 'error'; message?: string; order?: { reference: string; total: number } }

function OrderSuccess() {
  const { reference } = Route.useSearch()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<Status>({ state: 'loading' })
  useEffect(() => {
    if (!reference) { setStatus({ state: 'error', message: 'No payment reference was provided.' }); return }
    fetch('/api/paystack/verify', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ reference }) })
      .then(async (response) => ({ response, data: await response.json() as { verified?: boolean; message?: string; order?: { reference: string; total: number } } }))
      .then(({ response, data }) => { if (!response.ok || !data.verified || !data.order) throw new Error(data.message || 'Payment could not be verified.'); clearCart(); setStatus({ state: 'success', order: data.order }) })
      .catch((error: Error) => setStatus({ state: 'error', message: error.message }))
  }, [clearCart, reference])

  return <section className="shell grid min-h-[70vh] place-items-center py-20 text-center"><div className="max-w-xl rounded-[2.5rem] bg-white p-8 shadow-luxe sm:p-12">{status.state === 'loading' && <><LoaderCircle className="mx-auto animate-spin text-gold" size={56} /><h1 className="mt-7 font-display text-4xl text-navy">Confirming your payment</h1><p className="mt-3 text-muted">We’re securely verifying your transaction with Paystack.</p></>}{status.state === 'success' && <><CheckCircle2 className="mx-auto text-emerald-700" size={64} /><p className="eyebrow mt-6">Payment verified</p><h1 className="mt-3 font-display text-5xl text-navy">Your order is confirmed.</h1><p className="mt-4 leading-7 text-muted">Thank you for shopping with Chic Charm Collections. We’ll contact you with delivery updates shortly.</p><div className="mt-7 rounded-2xl bg-sand p-5 text-left text-sm"><div className="flex justify-between"><span>Reference</span><strong>{status.order?.reference}</strong></div><div className="mt-3 flex justify-between"><span>Amount paid</span><strong>{formatNaira(status.order?.total ?? 0)}</strong></div></div><Link to="/" className="button-primary mt-7">Continue Shopping</Link></>}{status.state === 'error' && <><ShieldAlert className="mx-auto text-brown" size={64} /><h1 className="mt-7 font-display text-5xl text-navy">We’re checking your order.</h1><p className="mt-4 leading-7 text-muted">{status.message} Your cart has not been cleared. If you were charged, please contact support with your payment reference.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/cart" className="button-primary">Return to Cart</Link><Link to="/contact" className="button-secondary">Contact Support</Link></div></>}</div></section>
}
