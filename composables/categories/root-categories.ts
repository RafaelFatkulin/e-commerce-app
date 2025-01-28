import type { RootCategory } from '~/types/categories'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useRootCategories() {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<RootCategory[]>, ErrorResponse>(
    'root-categories',
    async () => nuxtApp.$api('/categories'),
  )
}
