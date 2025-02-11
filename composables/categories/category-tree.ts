import type { Category } from '~/types/categories'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useCategoryTree() {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<Category[]>, ErrorResponse>(
    'category-tree',
    async () => nuxtApp.$api('/categories/tree'),
  )
}
