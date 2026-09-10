import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, CreditCard, PackageCheck, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import products, { categoryMeta, type ProductCategory } from '@/data/products'
import { ProductGrid } from '@/components/ProductGrid'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Chic Charm Collections | Premium Fashion & Lifestyle Store' }, { name: 'description', content: 'Shop elegant bags, clothing, jewelry and premium household cutlery from Chic Charm Collections.' }, { property: 'og:title', content: 'Chic Charm Collections' }, { property: 'og:description', content: 'Style, elegance and everyday essentials, beautifully curated in Nigeria.' }] }),
  component: HomePage,
})

const perks = [
  [Sparkles, 'Quality Products', 'Beautifully selected pieces made to delight.'],
  [Star, 'Affordable Luxury', 'Premium style at thoughtful, honest prices.'],
  [PackageCheck, 'Reliable Service', 'Helpful support from selection to delivery.'],
  [CreditCard, 'Easy Shopping', 'A smooth, simple and secure checkout.'],
  [ShieldCheck, 'Secure Payments', 'Protected payments powered by Paystack.'],
  [Truck, 'Fast Delivery', 'Prompt dispatch across Lagos and Nigeria.'],
] as const

function HomePage() {
  const reducedMotion = useReducedMotion()
  return <>
    <section className="hero-grid relative isolate overflow-hidden bg-navy text-cream">
      <div className="hero-glow" /><div className="hero-orbit" />
      <div className="shell grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <motion.div initial={reducedMotion ? {} : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative z-10">
          <span className="eyebrow text-gold">Curated in Nigeria · Styled for you</span>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(3.4rem,7vw,7.8rem)] leading-[.84] tracking-[-.045em]">Style lives in the <em className="font-normal text-gold">details.</em></h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-cream/72 sm:text-lg">Discover fashion, statement accessories, and elevated home essentials designed to make every day feel beautifully considered.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/search" search={{ q: '' }} className="button-gold">Shop Now <ArrowRight size={17} /></Link><a href="#collections" className="button-outline">Explore Collections</a></div>
          <div className="mt-12 flex gap-10 border-t border-white/12 pt-6"><div><strong className="font-display text-3xl text-gold">4</strong><span className="block text-[10px] uppercase tracking-widest text-cream/50">Collections</span></div><div><strong className="font-display text-3xl text-gold">100%</strong><span className="block text-[10px] uppercase tracking-widest text-cream/50">Secure checkout</span></div><div><strong className="font-display text-3xl text-gold">NG</strong><span className="block text-[10px] uppercase tracking-widest text-cream/50">Nationwide delivery</span></div></div>
        </motion.div>
        <motion.div initial={reducedMotion ? {} : { opacity: 0, scale: .94, x: 25 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .9, delay: .1 }} className="relative mx-auto w-full max-w-[630px]">
          <div className="hero-frame"><img src={categoryMeta.Clothing.image} alt="Elegant fashion from Chic Charm Collections" className="h-full w-full object-cover" /></div>
          <motion.div animate={reducedMotion ? {} : { y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-5 -left-4 max-w-[230px] rounded-3xl bg-cream p-5 text-navy shadow-2xl sm:-left-10"><span className="text-[9px] font-black uppercase tracking-[.2em] text-brown">New Season</span><p className="mt-2 font-display text-xl">Quiet luxury. Bold confidence.</p></motion.div>
        </motion.div>
      </div>
    </section>

    <section id="collections" className="shell py-20 sm:py-28"><div className="section-heading"><div><p className="eyebrow">Shop by category</p><h2>Four ways to charm.</h2></div><p>Thoughtful pieces for how you dress, celebrate, travel, and gather.</p></div><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{(Object.entries(categoryMeta) as [ProductCategory, typeof categoryMeta.Bags][]).map(([name, meta], index) => <Link key={name} to={meta.slug} className={`category-card ${index === 0 ? 'xl:translate-y-8' : index === 2 ? 'xl:-translate-y-5' : ''}`}><img src={meta.image} alt={`${name} collection`} loading="lazy" /><div className="category-shade" /><div className="category-content"><span>0{index + 1}</span><h3>{name.toUpperCase()}</h3><p>{meta.description}</p><strong>Explore Collection <ArrowRight size={16} /></strong></div></Link>)}</div></section>

    <ProductSection eyebrow="Handpicked for you" title="Featured Pieces" products={products.filter((product) => product.featured).slice(0, 8)} />
    <ProductSection eyebrow="Freshly arrived" title="New Arrivals" products={products.filter((product) => product.newArrival).slice(0, 8)} muted />
    <ProductSection eyebrow="Customer favourites" title="Best Sellers" products={products.filter((product) => product.bestSeller).slice(0, 8)} />

    <section className="shell py-20"><div className="offer-panel"><div><p className="eyebrow text-gold">The special edit</p><h2 className="mt-3 font-display text-4xl sm:text-6xl">A little luxury,<br />beautifully priced.</h2><p className="mt-5 max-w-lg leading-7 text-cream/70">Enjoy limited offers across selected fashion, home, and jewelry favourites while stock lasts.</p><Link to="/search" search={{ q: '' }} className="button-gold mt-8">Shop Special Offers <ArrowRight size={17} /></Link></div><div className="offer-number">15<sup>%</sup><span>OFF</span></div></div></section>

    <section className="bg-sand py-20 sm:py-28"><div className="shell"><div className="text-center"><p className="eyebrow">Why shop with us</p><h2 className="mt-3 font-display text-4xl text-navy sm:text-5xl">Thoughtful at every step.</h2></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{perks.map(([Icon, title, text]) => <div key={title} className="perk-card"><span><Icon size={22} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <section className="shell py-24"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="eyebrow">Loved by our community</p><h2 className="mt-4 font-display text-5xl leading-tight text-navy">“The details feel even more beautiful in person.”</h2><div className="mt-6 flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, index) => <Star key={index} fill="currentColor" size={17} />)}</div></div><div className="grid gap-4 sm:grid-cols-2"><blockquote className="testimonial"><p>“My bag arrived beautifully packaged and the quality exceeded my expectations. Chic Charm really understands elegant everyday style.”</p><footer>— Amaka, Lagos</footer></blockquote><blockquote className="testimonial sm:translate-y-8"><p>“The dinner set transformed my table. Ordering was easy, communication was excellent, and delivery was prompt.”</p><footer>— Zainab, Abuja</footer></blockquote></div></div></section>

    <section className="shell"><div className="newsletter-panel"><p className="eyebrow text-gold">A charming note, occasionally</p><h2 className="mt-4 font-display text-4xl sm:text-6xl">Be first to see what’s new.</h2><p className="mx-auto mt-4 max-w-xl text-cream/65">Join our list for new arrivals, styling inspiration, and private offers.</p><form onSubmit={(event) => event.preventDefault()} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="home-email">Email address</label><input id="home-email" type="email" required placeholder="Enter your email address" className="field border-white/15 bg-white/10 text-white placeholder:text-white/40" /><button className="button-gold shrink-0">Join the List</button></form></div></section>
  </>
}

function ProductSection({ eyebrow, title, products: sectionProducts, muted = false }: { eyebrow: string; title: string; products: typeof products; muted?: boolean }) {
  return <section className={muted ? 'bg-sand py-20' : 'shell py-20'}><div className={muted ? 'shell' : ''}><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><Link to="/search" search={{ q: '' }} className="text-link">View all <ArrowRight size={16} /></Link></div><div className="mt-9"><ProductGrid products={sectionProducts} /></div></div></section>
}
