import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'
export const Route = createFileRoute('/clothing')({ component: () => <CategoryPage category="Clothing" />, head: () => ({ meta: [{ title: 'Elegant Clothing | Chic Charm Collections' }, { name: 'description', content: 'Shop elegant coordinated sets, kids wear, skirts, blouses and jeans.' }] }) })
