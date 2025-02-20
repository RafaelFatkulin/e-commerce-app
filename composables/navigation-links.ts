import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavigationLinks() {
  const route = useRoute()

  const items = useState<NavigationMenuItem[]>('navigation-links', () => [
    {
      label: 'Главная',
      icon: 'i-heroicons-home',
      to: '/dashboard',
    },
    {
      label: 'Категории',
      icon: 'i-heroicons-squares-2x2',
      to: '/dashboard/categories',
    },
  ])

  return { items }
}
