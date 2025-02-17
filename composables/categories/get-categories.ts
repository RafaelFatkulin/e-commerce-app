import type { CategoryFilter, RootCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export async function useGetCategories() {
  const nuxtApp = useNuxtApp()

  const route = useRoute()

  const id = computed(() => route.params.id)

  const filter = reactive<CategoryFilter>({
    q: '',
    page: 1,
    per_page: 10,
    sort_by: 'id',
    sort_order: 'desc',
    parent_id: route.params.id ? Number(route.params.id) : undefined
  })
  const search = toRef<string>(filter.q || '')
  const debouncedSearch = refDebounced<string>(search, 500)

  watch(debouncedSearch, (newValue) => {
    console.log('@new', newValue);

    filter.q = newValue
    filter.page = 1
  })

  const queryParams = computed(() => createQueryParams({ ...filter, q: debouncedSearch.value }))

  const response = await useAsyncData<SuccessResponse<RootCategory[]>, ErrorResponse>(
    `get-category-of-${id}`,
    async () => nuxtApp.$api(`/categories`, {
      params: queryParams.value
    }),
    {
      watch: [queryParams, filter],
      immediate: true
    }
  )

  return { ...response, filter }
}
