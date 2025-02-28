import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavigationLinks() {
  const items = useState<NavigationMenuItem[]>('navigation-links', () => [
    {
      label: 'Главная',
      icon: 'i-lucide-house',
      to: '/dashboard',
    },
    {
      label: 'Категории',
      icon: 'i-lucide-grid-2x2',
      to: '/dashboard/categories',
    },
    {
      label: 'Бренды',
      icon: 'i-lucide-target',
      to: '/dashboard/brands',
    },
    {
      label: 'Товары',
      icon: 'i-lucide-shirt',
      to: '/dashboard/products',
    },
  ])

  return { items }
}
