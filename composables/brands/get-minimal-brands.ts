import type { MinimalBrand } from "~/types/brands"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetMinimalBrands = () => {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<MinimalBrand[]>, ErrorResponse>(
    'get-minimal-brands',
    async () => await nuxtApp.$api('/brands/list'),
    {
      immediate: true,
      dedupe: 'cancel',
    }
  )
}
