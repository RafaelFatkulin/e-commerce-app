import type { EditProduct, Product } from "~/types/products"
import { useGetProduct } from "./get-product"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export async function useEditProduct() {
  const nuxtApp = useNuxtApp()

  const route = useRoute()
  const toast = useToast()

  const { data: productData, refresh } = useGetProduct()

  const state = useState<Partial<EditProduct>>('edit-product', () => ({
    title: undefined,
    slug: undefined,
    description: undefined,
    brandId: undefined,
    categoryId: undefined,
    order: undefined,
    status: undefined
  }))

  watch(productData, () => {
    state.value.title = productData.value?.data.title
    state.value.slug = productData.value?.data.slug
    state.value.description = productData.value?.data.description
    state.value.brandId = productData.value?.data.brandId
    state.value.categoryId = productData.value?.data.categoryId
    state.value.order = productData.value?.data.order
    state.value.status = productData.value?.data.status
  })

  const response = await useAsyncData<SuccessResponse<Product>, ErrorResponse>(
    `edit-product-${route.params.id}`,
    async () => await nuxtApp.$api(`/products/${route.params.id}/edit`, {
      method: 'PATCH',
      body: state.value
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  const { data, status, error } = response

  watch(status, async () => {
    if (status.value === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message as string,
        icon: 'i-lucide-circle-check',
        color: 'success',
      })

      await refresh()
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
    ...response,
    state
  }
}
