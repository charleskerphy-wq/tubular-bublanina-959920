import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '@/components/CategoryPage'

export const Route = createFileRoute('/household-appliances')({
  component: () => <CategoryPage category="Household Appliances" />,
  head: () => ({ meta: [{ title: 'Household Appliances | Chic Charm Collections' }, { name: 'description', content: 'Explore the Household Appliances collection at Chic Charm Collections.' }] }),
})
