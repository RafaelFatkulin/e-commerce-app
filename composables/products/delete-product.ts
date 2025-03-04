import type { Product } from "~/types/products"
import { useGetProducts } from "./get-products"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useDeleteProduct = () => {
  const nuxtApp = useNuxtApp()
  const toast = useToast()

  const productToDelete = useState<Product | null>('product-to-delete', () => null)
  const isOpen = computed(() => !!productToDelete.value)

  const { refresh } = useGetProducts()

  const response = useAsyncData<SuccessResponse<Product>, ErrorResponse>(
    'delete-product',
    async () => await nuxtApp.$api(`/products/${productToDelete.value?.id}/delete`, {
      method: 'DELETE'
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  const { data, status, error } = response

  function setProductToDelete(product?: Product) {
    productToDelete.value = product || null
  }

  watch(status, () => {
    if (status.value === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message as string,
        icon: 'i-lucide-circle-check',
        color: 'success',
      })
      setProductToDelete()
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
    productToDelete,
    setProductToDelete,
    ...response,
  }
}
