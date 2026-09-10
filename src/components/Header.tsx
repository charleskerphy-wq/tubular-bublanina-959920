import { Link, useNavigate } from '@tanstack/react-router'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type FormEvent } from 'react'
import { useCart } from '@/context/CartContext'

const links = [
  ['Home', '/'], ['Bags', '/bags'], ['Clothing', '/clothing'], ['Cutlery', '/cutlery'],
  ['Jewelry', '/jewelry'], ['About', '/about'], ['Contact', '/contact'],
] as const

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const { count, cartPulse } = useCart()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    void navigate({ to: '/search', search: { q: query.trim() } })
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/95 shadow-[0_12px_40px_rgba(11,29,54,.1)] backdrop-blur-xl' : 'bg-cream/80 backdrop-blur-md'}`}>
      <div className="shell flex h-20 items-center justify-between gap-5 lg:h-24">
        <Link to="/" className="group flex items-center gap-3" aria-label="Chic Charm Collections home">
          <span className="grid size-11 place-items-center rounded-full bg-navy font-display text-xl text-gold shadow-luxe transition-transform group-hover:rotate-6">CC</span>
          <span className="hidden leading-none sm:block"><strong className="block font-display text-xl font-semibold tracking-wide text-navy">Chic Charm</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[.32em] text-brown">Collections</small></span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} to={href} activeProps={{ className: 'text-brown' }} className="nav-link">{label}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen((open) => !open)} className="icon-button" aria-label="Search products"><Search size={19} /></button>
          <motion.div key={cartPulse} animate={reducedMotion || !cartPulse ? {} : { scale: [1, 1.16, .96, 1] }} transition={{ duration: .55 }} className="relative">
            {cartPulse > 0 && <motion.span key={`ring-${cartPulse}`} initial={{ opacity: .7, scale: .75, rotate: 0 }} animate={reducedMotion ? {} : { opacity: 0, scale: 1.45, rotate: 180 }} transition={{ duration: .8 }} className="pointer-events-none absolute inset-0 rounded-full border border-gold" />}
            <Link to="/cart" className="icon-button relative bg-navy text-cream hover:bg-brown" aria-label={`Shopping cart with ${count} items`}>
              <ShoppingBag size={19} />
              <AnimatePresence mode="popLayout"><motion.span key={count} initial={reducedMotion ? {} : { scale: .4, y: 5 }} animate={{ scale: 1, y: 0 }} className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-black text-navy">{count}</motion.span></AnimatePresence>
            </Link>
          </motion.div>
          <button onClick={() => setMenuOpen((open) => !open)} className="icon-button xl:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && <motion.form onSubmit={submitSearch} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-navy/10 bg-cream p-4"><div className="shell flex gap-2"><label className="sr-only" htmlFor="site-search">Search products</label><input id="site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="field" placeholder="Search bags, jewelry, jeans…" /><button className="button-primary" type="submit">Search</button></div></motion.form>}
        {menuOpen && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-navy/10 bg-cream xl:hidden"><div className="shell grid py-4">{links.map(([label, href]) => <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="border-b border-navy/8 py-3 text-sm font-bold uppercase tracking-widest text-navy">{label}</Link>)}</div></motion.nav>}
      </AnimatePresence>
    </header>
  )
}
