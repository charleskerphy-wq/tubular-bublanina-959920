import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return <footer className="mt-24 bg-navy text-cream">
    <div className="shell grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
      <div><div className="font-display text-3xl text-gold">Chic Charm</div><div className="mt-1 text-xs font-bold uppercase tracking-[.35em] text-cream/60">Collections</div><p className="mt-6 max-w-sm leading-7 text-cream/70">Premium fashion, accessories, and refined home essentials thoughtfully selected for beautiful everyday living.</p><div className="mt-6 flex gap-3"><a className="footer-icon" href="#" aria-label="Instagram"><Instagram size={18} /></a><a className="footer-icon" href="#" aria-label="Facebook"><Facebook size={18} /></a></div></div>
      <div><h3 className="footer-title">Explore</h3><div className="footer-links"><Link to="/">Home</Link><Link to="/about">Our Story</Link><Link to="/search" search={{ q: '' }}>Shop All</Link><Link to="/contact">Contact</Link></div></div>
      <div><h3 className="footer-title">Collections</h3><div className="footer-links"><Link to="/bags">Bags</Link><Link to="/clothing">Clothing</Link><Link to="/cutlery">Cutlery</Link><Link to="/jewelry">Jewelry</Link></div></div>
      <div><h3 className="footer-title">Stay In The Loop</h3><p className="mb-4 text-sm leading-6 text-cream/65">New arrivals, special offers, and a little everyday inspiration.</p><form className="flex" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="newsletter">Email address</label><input id="newsletter" type="email" required placeholder="Your email" className="min-w-0 flex-1 rounded-l-full bg-white/10 px-5 text-sm outline-none ring-gold focus:ring-2" /><button className="rounded-r-full bg-gold px-5 font-bold text-navy" aria-label="Join newsletter"><Mail size={18} /></button></form><div className="mt-6 space-y-3 text-sm text-cream/65"><p className="flex gap-2"><Phone size={16} /> +234 000 000 0000</p><p className="flex gap-2"><MapPin size={16} /> Lagos, Nigeria</p></div></div>
    </div>
    <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-cream/50">© {new Date().getFullYear()} Chic Charm Collections. All rights reserved.</div>
  </footer>
}
