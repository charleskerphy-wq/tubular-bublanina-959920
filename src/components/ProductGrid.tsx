import type { Product } from '@/data/products'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <div className="col-span-full rounded-[2rem] border border-dashed border-navy/20 bg-white/60 p-12 text-center"><h3 className="font-display text-2xl text-navy">No pieces match yet</h3><p className="mt-2 text-muted">Try broadening your filters to discover more.</p></div>
  return <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}
