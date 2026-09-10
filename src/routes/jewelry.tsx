import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'
export const Route = createFileRoute('/jewelry')({ component: () => <CategoryPage category="Jewelry" />, head: () => ({ meta: [{ title: 'Jewelry | Chic Charm Collections' }, { name: 'description', content: 'Shop elegant necklaces, hand beads and earrings in Nigeria.' }] }) })
