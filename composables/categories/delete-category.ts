import type { RootCategory } from '~/types/categories'
import type { ErrorResponse, SuccessResponse } from '~/types/response'
import { useGetCategories } from './get-categories'

export function useDeleteCategory() {
  const nuxtApp = useNuxtApp()
  const toast = useToast()

  const categoryToDelete = useState<RootCategory | null>('category-to-delete', () => null)
  const isOpen = computed(() => !!categoryToDelete.value)

  const { refresh } = useGetCategories()

  const response = useAsyncData<SuccessResponse<RootCategory>, ErrorResponse>(
    'delete-category',
    async () => nuxtApp.$api(`/categories/${categoryToDelete.value?.id}`, {
      method: 'DELETE',
    }),
    {
      immediate: false,
      lazy: true,
    },
  )

  watch(isOpen, () => {
    console.log(isOpen.value);

  })

  const { data, status, error } = response

  function setCategoryToDelete(category?: RootCategory) {
    console.log('@category', category);

    categoryToDelete.value = category || null

    console.log('isOpen after set:', isOpen.value);
  }

  watch(status, () => {
    if (status.value === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message as string,
        icon: 'i-lucide-circle-check',
        color: 'success',
      })
      setCategoryToDelete()
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
    categoryToDelete,
    setCategoryToDelete,
    ...response,
  }
}
