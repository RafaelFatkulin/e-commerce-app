import type { RootCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export function useGetCategories(parent_id: number) {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<RootCategory[]>, ErrorResponse>(
    `get-category-of-${parent_id}`,
    async () => nuxtApp.$api(`/categories`, {
      params: {
        parent_id
      }
    }),
    {
      immediate: true
    }
  )
}
