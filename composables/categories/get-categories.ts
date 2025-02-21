import type { CategoryFilter, RootCategory } from '~/types/categories'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useGetCategories() {
  const nuxtApp = useNuxtApp()
  const route = useRoute()
  const id = route.params.id

  const filter = reactive<CategoryFilter>({
    q: '',
    page: 1,
    per_page: 5,
    sort_by: 'id',
    sort_order: 'desc',
    parent_id: route.params.id ? Number(route.params.id) : undefined,
  })

  const debouncedQ = refDebounced(
    computed(() => filter.q),
    500,
  )

  const filterWithoutQ = computed(() => ({
    page: filter.page,
    per_page: filter.per_page,
    sort_by: filter.sort_by,
    sort_order: filter.sort_order,
    parent_id: filter.parent_id,
  }))

  const queryParams = computed(() => ({
    ...filterWithoutQ.value,
    q: debouncedQ.value,
  }))

  const response = useAsyncData<SuccessResponse<RootCategory[]>, ErrorResponse>(
    `get-category-of-${id}`,
    async () => nuxtApp.$api(`/categories`, {
      params: queryParams.value,
    }),
    {
      watch: [filterWithoutQ, debouncedQ],
      immediate: true,
      default: () => ({ data: [], error: null }),
      dedupe: 'cancel',
    },
  )

  return { ...response, filter }
}
