import type { Brand, EditBrand } from '~/types/brands'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export async function useEditBrand(bodyData: EditBrand) {
  const nuxtApp = useNuxtApp()

  const route = useRoute()
  const id = route.params.id

  const response = await useAsyncData<SuccessResponse<Brand>, ErrorResponse>(
    `edit-brand-${id}`,
    async () => nuxtApp.$api(`/brands/${id}/edit`, {
      method: 'PATCH',
      body: bodyData,
    }),
    { immediate: false, lazy: true },
  )

  return {
    ...response,
  }
}
