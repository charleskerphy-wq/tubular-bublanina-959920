import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'
export const Route = createFileRoute('/cutlery')({ component: () => <CategoryPage category="Cutlery" />, head: () => ({ meta: [{ title: 'Premium Cutlery | Chic Charm Collections' }, { name: 'description', content: 'Shop refined knives, spoons, plates, jugs and forks for beautiful dining.' }] }) })
