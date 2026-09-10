import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { useState } from 'react'
import products, { categoryMeta } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { discountedPrice, formatNaira } from '@/lib/format'
import { ProductGrid } from '@/components/ProductGrid'

export const Route = createFileRoute('/product/$productId')({
  loader: ({ params }) => {
    const product = products.find((item) => item.id === Number(params.productId))
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? 'Product'} | Chic Charm Collections` }, { name: 'description', content: loaderData?.description ?? '' }] }),
  component: ProductDetails,
})

function ProductDetails() {
  const product = Route.useLoaderData()
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
  const schema = { '@context': 'https://schema.org', '@type': 'Product', name: product.name, image: product.image, description: product.description, offers: { '@type': 'Offer', priceCurrency: 'NGN', price: discountedPrice(product.price, product.discount), availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="shell py-10 sm:py-16"><Link to={categoryMeta[product.category].slug} className="text-link"><ArrowLeft size={16} /> Back to {product.category}</Link><div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-sand"><img src={product.image} alt={product.name} className="aspect-[4/5] h-full w-full object-cover" /><span className={`absolute left-5 top-5 rounded-full px-4 py-2 text-[10px] font-black tracking-[.18em] ${product.inStock ? 'bg-cream text-forest' : 'bg-brown text-white'}`}>{product.inStock ? 'AVAILABLE' : 'OUT OF STOCK'}</span></div>
      <div className="self-center"><p className="eyebrow">{product.category} · {product.subcategory}</p><h1 className="mt-4 font-display text-5xl leading-[1.02] text-navy sm:text-7xl">{product.name}</h1><div className="mt-6 flex items-center gap-3"><strong className="text-3xl text-brown">{formatNaira(discountedPrice(product.price, product.discount))}</strong>{product.discount > 0 && <span className="text-muted line-through">{formatNaira(product.price)}</span>}</div><p className="mt-7 text-lg leading-8 text-muted">{product.description}</p><div className="mt-7 flex items-center gap-2 text-sm font-bold text-navy"><span className={`size-2.5 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-brown'}`} />{product.inStock ? `${product.stockQuantity} in stock and ready to dispatch` : 'OUT OF STOCK — purchasing is currently unavailable'}</div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><div className="flex h-14 items-center justify-between rounded-full border border-navy/15 px-2"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="quantity-button" aria-label="Decrease quantity"><Minus size={17} /></button><span className="w-10 text-center font-bold">{quantity}</span><button onClick={() => setQuantity((value) => Math.min(product.stockQuantity, value + 1))} disabled={!product.inStock} className="quantity-button" aria-label="Increase quantity"><Plus size={17} /></button></div><button disabled={!product.inStock} onClick={() => addItem(product, quantity)} className="button-primary flex-1"><ShoppingBag size={18} />{product.inStock ? 'Add to Cart' : 'Out of Stock'}</button></div>
        <div className="mt-9 grid gap-3 sm:grid-cols-2"><div className="detail-note"><Truck size={20} /><span><strong>Fast delivery</strong><small>Careful dispatch across Nigeria</small></span></div><div className="detail-note"><ShieldCheck size={20} /><span><strong>Secure payment</strong><small>Protected by Paystack</small></span></div></div><ul className="mt-7 space-y-3 text-sm text-muted"><li className="flex gap-2"><Check size={17} className="text-gold" /> Carefully inspected before dispatch</li><li className="flex gap-2"><Check size={17} className="text-gold" /> Friendly customer support</li></ul>
      </div>
    </div></section>
    {related.length > 0 && <section className="bg-sand py-20"><div className="shell"><p className="eyebrow">You may also love</p><h2 className="mt-3 mb-9 font-display text-4xl text-navy">Related pieces</h2><ProductGrid products={related} /></div></section>}
  </>
}
