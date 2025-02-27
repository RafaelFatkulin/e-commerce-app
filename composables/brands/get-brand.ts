import type { BrandWithMedia } from "~/types/brands"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetBrand = () => {
  const nuxtApp = useNuxtApp()
  const route = useRoute()

  return useAsyncData<SuccessResponse<BrandWithMedia>, ErrorResponse>(
    `get-category-${route.params.id}`,
    async () => nuxtApp.$api(`/brands/${route.params.id}`),
    {
      immediate: true,
      dedupe: 'defer'
    }
  )
}
