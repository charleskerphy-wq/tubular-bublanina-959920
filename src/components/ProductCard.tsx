import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { discountedPrice, formatNaira } from '@/lib/format'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const reducedMotion = useReducedMotion()
  const finalPrice = discountedPrice(product.price, product.discount)
  return <motion.article initial={reducedMotion ? {} : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} className="group overflow-hidden rounded-[1.6rem] bg-white shadow-card transition-shadow duration-500 hover:shadow-luxe">
    <Link to="/product/$productId" params={{ productId: String(product.id) }} className="relative block aspect-[4/5] overflow-hidden bg-sand">
      <img src={product.image} alt={`${product.name} — ${product.subcategory}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <span className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[9px] font-black tracking-[.16em] shadow-md ${product.inStock ? 'bg-cream text-forest' : 'bg-brown text-white'}`}>{product.inStock ? 'AVAILABLE' : 'OUT OF STOCK'}</span>
      {product.discount > 0 && <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1.5 text-[10px] font-black text-navy">-{product.discount}%</span>}
    </Link>
    <div className="p-4 sm:p-5"><p className="text-[10px] font-black uppercase tracking-[.2em] text-brown/65">{product.subcategory}</p><Link to="/product/$productId" params={{ productId: String(product.id) }}><h3 className="mt-2 min-h-12 font-display text-lg leading-tight text-navy sm:text-xl">{product.name}</h3></Link><div className="mt-3 flex flex-wrap items-end gap-2"><strong className="text-base text-navy sm:text-lg">{formatNaira(finalPrice)}</strong>{product.discount > 0 && <span className="text-xs text-muted line-through">{formatNaira(product.price)}</span>}</div><button disabled={!product.inStock} onClick={() => addItem(product)} className="button-cart mt-4 w-full"><ShoppingBag size={16} />{product.inStock ? 'Add to Cart' : 'Out of Stock'}</button></div>
  </motion.article>
}
