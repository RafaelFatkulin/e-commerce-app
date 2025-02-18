import type { CategoryFilter, RootCategory } from "~/types/categories"
import type { ErrorResponse, SuccessResponse } from "~/types/response"
import { useDebounceFn } from '@vueuse/core'

export async function useGetCategories() {
  const nuxtApp = useNuxtApp()
  const route = useRoute()
  const id = computed(() => route.params.id)

  const filter = reactive<CategoryFilter>({
    q: 'test',
    page: 1,
    per_page: 10,
    sort_by: 'id',
    sort_order: 'desc',
    parent_id: route.params.id ? Number(route.params.id) : undefined
  })



  const queryParams = computed(() => createQueryParams(filter))

  const response = await useAsyncData<SuccessResponse<RootCategory[]>, ErrorResponse>(
    `get-category-of-${id}`,
    async () => nuxtApp.$api(`/categories`, {
      params: queryParams.value
    }),
    {
      watch: [queryParams],
      immediate: true,
    }
  )

  return { ...response, filter }
}