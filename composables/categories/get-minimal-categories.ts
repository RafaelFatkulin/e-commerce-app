import type { MinimalCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetMinimalCategories = () => {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<MinimalCategory[]>, ErrorResponse>(
    'get-minimal-categories',
    async () => await nuxtApp.$api('/categories/list'),
    {
      immediate: true,
      dedupe: 'cancel',
      getCachedData: null
    }
  )
}
