import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'
export const Route = createFileRoute('/bags')({ component: () => <CategoryPage category="Bags" />, head: () => ({ meta: [{ title: 'Premium Bags | Chic Charm Collections' }, { name: 'description', content: 'Shop tote bags, women bags, school bags and ladies bags in Nigeria.' }] }) })
