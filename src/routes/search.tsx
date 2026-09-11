import { createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { categories, storefrontProducts, type StorefrontCategory } from '@/data/products'
import { ProductGrid } from '@/components/ProductGrid'

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === 'string' ? search.q : '' }),
  component: SearchPage,
  head: () => ({ meta: [{ title: 'Search Products | Chic Charm Collections' }] }),
})

function SearchPage() {
  const { q } = Route.useSearch()
  const [query, setQuery] = useState(q)
  const [category, setCategory] = useState('All')
  const [subcategory, setSubcategory] = useState('All')
  const [availability, setAvailability] = useState('all')
  const [sort, setSort] = useState('featured')
  const results = useMemo(() => storefrontProducts.filter((product) => !query || `${product.name} ${product.category} ${product.subcategory}`.toLowerCase().includes(query.toLowerCase())).filter((product) => category === 'All' || product.category === category).filter((product) => subcategory === 'All' || product.subcategory === subcategory).filter((product) => availability === 'all' || (availability === 'in' ? product.inStock : !product.inStock)).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : sort === 'newest' ? b.createdAt.localeCompare(a.createdAt) : Number(b.featured) - Number(a.featured)), [availability, category, query, sort, subcategory])
  const subcategories = category === 'All' ? Object.values(categories).flat() : categories[category as StorefrontCategory]
  return <section className="shell py-12 sm:py-20"><div className="max-w-3xl"><p className="eyebrow">Find your next favourite</p><h1 className="mt-3 font-display text-5xl text-navy sm:text-6xl">Search the collection</h1></div><label className="relative mt-8 block max-w-3xl"><span className="sr-only">Search</span><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brown" size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="field py-4 pl-13" placeholder="Search by product, category, or subcategory" /></label><div className="my-8 grid gap-3 rounded-[1.5rem] bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4"><label className="control-label">Category<select className="select-field" value={category} onChange={(event) => { setCategory(event.target.value); setSubcategory('All') }}><option>All</option>{Object.keys(categories).map((item) => <option key={item}>{item}</option>)}</select></label><label className="control-label">Subcategory<select className="select-field" value={subcategory} onChange={(event) => setSubcategory(event.target.value)}><option>All</option>{subcategories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="control-label">Availability<select className="select-field" value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="all">All</option><option value="in">Available</option><option value="out">Out of stock</option></select></label><label className="control-label">Sort<select className="select-field" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price low to high</option><option value="high">Price high to low</option><option value="newest">Newest</option></select></label></div><p className="mb-6 text-sm text-muted">{results.length} result{results.length === 1 ? '' : 's'} {query && <>for “<strong>{query}</strong>”</>}</p><ProductGrid products={results} /></section>
}
