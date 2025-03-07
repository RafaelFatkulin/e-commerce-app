import type { RootCategory } from '~/types/categories'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useGetCategory(id: number) {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<RootCategory>, ErrorResponse>(
    'get-category-by-id',
    async () => nuxtApp.$api(`/categories/${id}`),
    {
      immediate: true,
    },
  )
}
