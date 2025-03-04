import type { CreateProduct, Product } from "~/types/products"
import { useGetProducts } from "./get-products"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useCreateProduct = () => {
  const nuxtApp = useNuxtApp()
  const toast = useToast()

  const isOpen = useState<boolean>('is-create-product-modal-open', () => false)

  const state = useState<Partial<CreateProduct>>('create-product', () => ({
    title: undefined,
    description: undefined,
    brandId: undefined,
    categoryId: undefined
  }))

  const resetForm = () => {
    state.value.title = undefined
    state.value.description = undefined
    state.value.brandId = undefined
    state.value.categoryId = undefined
  }

  const { refresh } = useGetProducts()

  const response = useAsyncData<SuccessResponse<Product>, ErrorResponse>(
    'create-product',
    async () => await nuxtApp.$api('/products', {
      method: 'POST',
      body: state.value
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  const { data, status, error } = response

  watch(status, (newStatus) => {
    if (newStatus === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message ?? 'Товар успешно создан',
        icon: 'i-lucide-circle-check',
        color: 'success',
      })
      isOpen.value = false
      resetForm()
      refresh()
    }
    else if (newStatus === 'error') {
      if (error.value?.data?.errors) {
        toast.add({
          title: error.value?.data?.message as string ?? 'Ошибка',
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
          description: error.value?.data?.message as string ?? 'Не удалось создать товар',
          icon: 'i-lucide-circle-x',
          color: 'error',
        })
      }
    }
  })

  return {
    ...response,
    isOpen,
    state,
    resetForm
  }
}
