import type { CategoryFilter, RootCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export async function useGetCategories() {
  const nuxtApp = useNuxtApp()
  const route = useRoute()
  const id = route.params.id

  // Reactive filter object including q
  const filter = reactive<CategoryFilter>({
    q: '',
    page: 1,
    per_page: 10,
    sort_by: 'id',
    sort_order: 'desc',
    parent_id: route.params.id ? Number(route.params.id) : undefined
  })

  // Debounced version of filter.q
  const debouncedQ = refDebounced(
    computed(() => filter.q),
    500
  )

  // Base filter without q for immediate reactivity
  const filterWithoutQ = computed(() => ({
    page: filter.page,
    per_page: filter.per_page,
    sort_by: filter.sort_by,
    sort_order: filter.sort_order,
    parent_id: filter.parent_id
  }))

  // Query params combining debounced q with other filter params
  const queryParams = computed(() => ({
    ...filterWithoutQ.value,
    q: debouncedQ.value
  }))

  const response = await useAsyncData<SuccessResponse<RootCategory[]>, ErrorResponse>(
    `get-category-of-${id}`,
    async () => nuxtApp.$api(`/categories`, {
      params: queryParams.value
    }),
    {
      watch: [filterWithoutQ, debouncedQ], // Watch these separately
      immediate: true,
      default: () => ({ data: [], error: null }),
      dedupe: 'cancel'
    }
  )

  return { ...response, filter }
}