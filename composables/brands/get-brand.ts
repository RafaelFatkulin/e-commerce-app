import type { BrandWithMedia } from "~/types/brands"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetBrand = (id: number) => {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<BrandWithMedia>, ErrorResponse>(
    `get-category-${id}`,
    async () => nuxtApp.$api(`/brands/${id}`),
    {
      immediate: true
    }
  )
}
