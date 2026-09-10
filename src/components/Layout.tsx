import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRouterState } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const reducedMotion = useReducedMotion()
  const { toast } = useCart()
  return <>
    <Header />
    <AnimatePresence mode="wait"><motion.main key={pathname} initial={reducedMotion ? {} : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? {} : { opacity: 0 }} transition={{ duration: .35 }} className="min-h-screen pt-20 lg:pt-24">{children}</motion.main></AnimatePresence>
    <Footer />
    <AnimatePresence>{toast && <motion.div role="status" initial={reducedMotion ? {} : { opacity: 0, y: 30, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full bg-navy px-5 py-3 text-sm font-bold text-cream shadow-2xl"><CheckCircle2 className="text-gold" size={19} />{toast}</motion.div>}</AnimatePresence>
  </>
}
