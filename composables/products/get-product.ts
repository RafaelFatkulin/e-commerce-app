import type { Product } from "~/types/products"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetProduct = () => {
  const nuxtApp = useNuxtApp()
  const route = useRoute()

  return useAsyncData<SuccessResponse<Product>, ErrorResponse>(
    `get-product-${route.params.id}`,
    async () => await nuxtApp.$api(`/products/${route.params.id}`),
    {
      immediate: true,
      dedupe: 'defer'
    }
  )
}
