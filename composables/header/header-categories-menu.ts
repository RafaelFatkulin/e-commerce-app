import type { Category } from '~/types/categories'
import { useCategoryTree } from '../categories/category-tree'

export function useHeaderCategoriesMenu() {
  const { data } = useCategoryTree()

  const generateMenuItems = (categories: Category[]) => {
    const items = categories.map(item => ({
      id: item.id,
      label: item.shortTitle,
      to: { name: 'products-slug', params: { slug: item.slug } },
      ...(item.categories.length > 0 && {
        children: generateMenuSubitems(item.categories),
      }),
    }))
    return items
  }

  const generateMenuSubitems = (categories: Category[]) => {
    return categories.map(item => ({
      label: item.shortTitle,
      to: { name: 'products-slug', params: { slug: item.slug } },
    }))
  }

  const categories = computed(() => generateMenuItems(data.value ? data.value.data : []))

  const activeCategoryId = ref<number | null>(null)
  const activeCategory = computed(() =>
    categories.value.find(category => category.id === activeCategoryId.value),
  )

  const isActive = (categoryId: number) => activeCategoryId.value === categoryId

  let hideTimer: NodeJS.Timeout | null = null

  const toggleCategory = (categoryId: number | null, show: boolean = true) => {
    if (!categoryId) {
      clearHideTimer()
      activeCategoryId.value = null
      return
    }

    if (isActive(categoryId)) {
      startHideTimer()
    }
    else {
      clearHideTimer()
      activeCategoryId.value = categoryId
    }
  }

  const startHideTimer = () => {
    clearHideTimer()
    hideTimer = setTimeout(() => {
      activeCategoryId.value = null
    }, 500)
  }

  const clearHideTimer = () => {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
  }

  const hideMenuInstantly = () => {
    activeCategoryId.value = null
  }

  return {
    categories,
    activeCategory,
    toggleCategory,
    isActive,
    startHideTimer,
    clearHideTimer,
    hideMenuInstantly,
  }
}
