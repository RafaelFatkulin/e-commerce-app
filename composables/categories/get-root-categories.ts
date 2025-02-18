import type { CategoryFilter, RootCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export function useGetRootCategories() {
  const nuxtApp = useNuxtApp()

  const filter = reactive<CategoryFilter>({
    q: '',
    page: 1,
    per_page: 100,
    sort_by: 'id',
    sort_order: 'desc',
    parent_id: undefined
  })
  const search = toRef<string>(filter.q || '')
  const debouncedSearch = refDebounced<string>(search, 500)

  watch(debouncedSearch, (newValue) => {
    filter.q = newValue
    filter.page = 1
  })

  const queryParams = computed(() => createQueryParams({ ...filter, q: debouncedSearch.value }))

  const response = useAsyncData<SuccessResponse<RootCategory[]>, ErrorResponse>(
    `get-root-categories`,
    async () => nuxtApp.$api(`/categories`, {
      params: queryParams.value
    }),
    {
      watch: [queryParams, filter],
      immediate: true,
    }
  )

  return { ...response, filter }
}
