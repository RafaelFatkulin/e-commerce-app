import type { EditCategory, RootCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"
import { useGetCategory } from "./get-category"

export const useEditCategory = async (bodyData: EditCategory) => {
  const nuxtApp = useNuxtApp()

  const route = useRoute()
  const id = route.params.id

  const toast = useToast()

  const { refresh } = useGetCategory(Number(id))

  const response = await useAsyncData<SuccessResponse<RootCategory>, ErrorResponse>(
    `edit-category-${id}`,
    async () => nuxtApp.$api(`/categories/${id}`, {
      method: 'PATCH',
      body: bodyData,
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  const { data, error } = response

  watch(data, () => {
    toast.add({
      title: 'Успешно',
      description: data.value?.message as string,
      icon: 'i-lucide-circle-check',
      color: 'success'
    })

    refresh()

    console.log('updated')
  })

  watch(error, () => {
    toast.add({
      title: 'Ошибка',
      description: error.value?.data?.message as string,
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  })

  return {
    ...response
  }
}
