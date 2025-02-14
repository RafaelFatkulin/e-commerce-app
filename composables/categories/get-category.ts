import type { RootCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetCategory = (id: number) => {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<RootCategory>, ErrorResponse>(
    'get-bategory-by-id',
    async () => nuxtApp.$api(`/categories/${id}`),
    {
      immediate: true
    }
  )
}
