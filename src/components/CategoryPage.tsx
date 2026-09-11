import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { categories, categoryMeta, storefrontProducts, type StorefrontCategory } from '@/data/products'
import { ProductGrid } from './ProductGrid'

type Sort = 'featured' | 'low' | 'high' | 'newest'

export function CategoryPage({ category }: { category: StorefrontCategory }) {
  const [subcategory, setSubcategory] = useState('All')
  const [availability, setAvailability] = useState('all')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [sort, setSort] = useState<Sort>('featured')
  const meta = categoryMeta[category]
  const filtered = useMemo(() => storefrontProducts.filter((product) => product.category === category)
    .filter((product) => subcategory === 'All' || product.subcategory === subcategory)
    .filter((product) => availability === 'all' || (availability === 'in' ? product.inStock : !product.inStock))
    .filter((product) => product.price <= maxPrice)
    .sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : sort === 'newest' ? b.createdAt.localeCompare(a.createdAt) : Number(b.featured) - Number(a.featured)), [availability, category, maxPrice, sort, subcategory])

  return <>
    <section className="relative isolate min-h-[430px] overflow-hidden bg-navy text-cream">
      <img src={meta.image} alt={`${category} collection`} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-brown/35" />
      <div className="shell flex min-h-[430px] items-end py-16"><div className="max-w-2xl"><span className="eyebrow text-gold">The {category} Edit</span><h1 className="mt-4 font-display text-5xl leading-none sm:text-7xl">Beautifully chosen.<br />Distinctly yours.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-cream/75">{meta.description} Browse pieces chosen for quality, character, and lasting style.</p></div></div>
    </section>
    <section className="shell py-12 sm:py-16">
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2"><button onClick={() => setSubcategory('All')} className={`filter-pill ${subcategory === 'All' ? 'filter-pill-active' : ''}`}>All {category}</button>{categories[category].map((item) => <button key={item} onClick={() => setSubcategory(item)} className={`filter-pill ${subcategory === item ? 'filter-pill-active' : ''}`}>{item}</button>)}</div>
      <div className="mb-8 grid gap-4 rounded-[1.5rem] bg-white p-4 shadow-card md:grid-cols-[1fr_1fr_1.4fr] md:items-end">
        <label className="control-label">Availability<select value={availability} onChange={(event) => setAvailability(event.target.value)} className="select-field"><option value="all">All products</option><option value="in">Available</option><option value="out">Out of stock</option></select></label>
        <label className="control-label">Sort by<select value={sort} onChange={(event) => setSort(event.target.value as Sort)} className="select-field"><option value="featured">Featured</option><option value="low">Price low to high</option><option value="high">Price high to low</option><option value="newest">Newest</option></select></label>
        <label className="control-label"><span className="flex justify-between">Maximum price <strong>₦{maxPrice.toLocaleString()}</strong></span><input type="range" min="8000" max="50000" step="1000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="accent-brown" /></label>
      </div>
      <div className="mb-6 flex items-center justify-between"><div><p className="eyebrow">Curated collection</p><h2 className="mt-2 font-display text-3xl text-navy">{subcategory === 'All' ? `All ${category}` : subcategory}</h2></div><span className="flex items-center gap-2 text-sm text-muted"><SlidersHorizontal size={16} /> {filtered.length} products</span></div>
      <ProductGrid products={filtered} />
    </section>
  </>
}
