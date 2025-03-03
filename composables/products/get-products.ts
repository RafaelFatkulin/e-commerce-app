import type { ProductFilter, ProductWithInfo } from "~/types/products"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export function useGetProducts() {
  const nuxtApp = useNuxtApp()

  const filter = useState<ProductFilter>('products-filter', () => ({
    q: '',
    page: 1,
    per_page: 10,
    sort_by: 'id',
    sort_order: 'desc',
    brandId: undefined,
    categoryId: undefined
  }))

  const queryParamsRaw = computed(() => ({
    q: filter.value.q,
    page: filter.value.page,
    per_page: filter.value.per_page,
    sort_by: filter.value.sort_by,
    sort_order: filter.value.sort_order,
    brand_id: filter.value.brand_id,
    category_id: filter.value.category_id
  }))

  const queryParams = refDebounced(queryParamsRaw, 500)

  const path = apiEndpoints().products.getAll()

  const response = useAsyncData<SuccessResponse<ProductWithInfo[]>, ErrorResponse>(
    'get-products',
    async () => await nuxtApp.$api(path, {
      params: queryParams.value
    }),
    {
      watch: [queryParams],
      immediate: true,
      dedupe: 'defer'
    }
  )

  return {
    ...response,
    filter
  }
}
