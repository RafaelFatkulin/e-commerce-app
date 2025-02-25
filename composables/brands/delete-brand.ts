import type { Brand } from "~/types/brands"
import { useGetBrands } from "./get-brands"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useDeleteBrand = () => {
  const nuxtApp = useNuxtApp()
  const toast = useToast()

  const brandToDelete = useState<Brand | null>('brand-to-delete', () => null)
  const isOpen = computed(() => !!brandToDelete.value)

  const { refresh } = useGetBrands()

  const response = useAsyncData<SuccessResponse<Brand>, ErrorResponse>(
    'delete-brand',
    async () => nuxtApp.$api(`/brands/${brandToDelete.value?.id}/delete`, {
      method: 'DELETE'
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  const { data, status, error } = response

  function setBrandToDelete(brand?: Brand) {
    brandToDelete.value = brand || null
  }

  watch(status, () => {
    if (status.value === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message as string,
        icon: 'i-lucide-circle-check',
        color: 'success'
      })
      setBrandToDelete()
      refresh()
    }
    if (status.value === 'error') {
      if (error.value?.data?.errors) {
        toast.add({
          title: error.value?.data?.message as string,
          description: error.value?.data?.errors.reduce((acc, curr) => {
            return acc.concat(`${curr.message}\n`)
          }, ''),
          icon: 'i-lucide-circle-x',
          color: 'error',
        })
      }
      else {
        toast.add({
          title: 'Ошибка',
          description: error.value?.data?.message as string,
          icon: 'i-lucide-circle-x',
          color: 'error',
        })
      }
    }
  })

  return {
    isOpen,
    brandToDelete,
    setBrandToDelete,
    ...response
  }
}
