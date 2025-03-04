import type { MinimalCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetMinimalCategories = (isNotRoot: boolean = false) => {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<MinimalCategory[]>, ErrorResponse>(
    'get-minimal-categories',
    async () => await nuxtApp.$api('/categories/list', {
      query: {
        'not-root': isNotRoot
      }
    }),
    {
      immediate: true,
      dedupe: 'cancel',
    }
  )
}
