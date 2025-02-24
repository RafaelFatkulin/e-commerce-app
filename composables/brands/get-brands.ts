import type { Brand, BrandFilter } from "~/types/brands"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useGetBrands = () => {
  const nuxtApp = useNuxtApp()

  const filter = reactive<BrandFilter>({
    q: '',
    page: 1,
    per_page: 10,
    sort_by: 'id',
    sort_order: 'desc',
  })

  const debouncedQ = refDebounced(
    computed(() => filter.q),
    500
  )

  const filterWithoutQ = computed(() => ({
    ...filter,
    q: undefined
  }))

  const queryParams = computed(() => ({
    ...filterWithoutQ.value,
    q: debouncedQ.value
  }))

  const response = useAsyncData<SuccessResponse<Brand[]>, ErrorResponse>(
    'get-brands',
    async () => nuxtApp.$api('/brands', {
      params: queryParams.value
    }),
    {
      watch: [filterWithoutQ, debouncedQ],
      immediate: true,
      dedupe: 'cancel'
    }
  )

  return { ...response, filter }
}
