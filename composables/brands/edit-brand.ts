import type { ErrorResponse, SuccessResponse } from "~/types/response"
import { useGetBrand } from "./get-brand"
import type { Brand, EditBrand } from "~/types/brands"

export const useEditBrand = async (bodyData: EditBrand) => {
  const nuxtApp = useNuxtApp()

  const route = useRoute()
  const id = route.params.id

  const toast = useToast()

  const response = await useAsyncData<SuccessResponse<Brand>, ErrorResponse>(
    `edit-brand-${id}`,
    async () => nuxtApp.$api(`/brands/${id}/edit`, {
      method: 'PATCH',
      body: bodyData
    }),
    { immediate: false, lazy: true }
  )

  return {
    ...response
  }
}
