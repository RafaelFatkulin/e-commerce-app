import type { ErrorResponse, SuccessResponse } from "~/types/response"
import { useGetBrand } from "./get-brand"
import type { Brand, EditBrand } from "~/types/brands"

export const useEditBrand = async (bodyData: EditBrand) => {
  const nuxtApp = useNuxtApp()

  const route = useRoute()
  const id = route.params.id

  const toast = useToast()

  const { refresh } = useGetBrand(Number(id))

  const response = await useAsyncData<SuccessResponse<Brand>, ErrorResponse>(
    `edit-brand-${id}`,
    async () => nuxtApp.$api(`/brands/${id}/edit`, {
      method: 'PATCH',
      body: bodyData
    }),
    { immediate: false, lazy: true }
  )

  const { data, status, error } = response

  watch(status, () => {
    if (status.value === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message as string,
        icon: 'i-lucide-circle-check',
        color: 'success'
      })

      refresh()
    }

    if (status.value === 'error') {
      toast.add({
        title: 'Ошибка',
        description: error.value?.data?.message as string,
        icon: 'i-lucide-circle-x',
        color: 'error',
      })
    }
  })

  return {
    ...response
  }
}
