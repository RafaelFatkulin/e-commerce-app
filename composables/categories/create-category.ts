import type { CreateCategory, RootCategory } from '~/types/categories'
import type { ErrorResponse, SuccessResponse } from '~/types/response'
import { useGetCategories } from './get-categories'

export function useCreateCategory() {
  const nuxtApp = useNuxtApp()
  const route = useRoute()
  const toast = useToast()
  const id = route.params.id

  const isOpen = ref<boolean>(false)

  const parentId = computed(() => {
    if (!id)
      return undefined
    if (Array.isArray(id))
      return undefined
    return Number(id) || undefined
  })

  const state = reactive<Partial<CreateCategory>>({
    title: '',
    shortTitle: '',
    description: '',
    parentId: parentId.value,
    slug: '',
    order: 1,
    status: 'active',
  })

  const resetForm = () => {
    state.title = ''
    state.shortTitle = ''
    state.description = ''
    state.parentId = parentId.value
    state.slug = ''
    state.order = 1
    state.status = 'active'
  }

  const { refresh } = useGetCategories()

  const response = useAsyncData<SuccessResponse<RootCategory>, ErrorResponse>(
    'create-category',
    async () => nuxtApp.$api('/categories', {
      method: 'POST',
      body: state,
    }),
    {
      immediate: false,
      lazy: true,
    },
  )

  const { data, error, status } = response

  watch(status, () => {
    if (status.value === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message as string,
        icon: 'i-lucide-circle-check',
        color: 'success',
      })
      isOpen.value = false
      console.log(isOpen.value);
      resetForm()

      refresh()
    }
    if (status.value === 'error') {
      if (error.value?.data?.errors) {
        toast.add({
          title: error.value?.data?.message as string,
          description: error.value?.data?.errors.reduce((acc, curr) => {
            return acc.concat(`${curr.message}\n`);
          }, ''),
          icon: 'i-lucide-circle-x',
          color: 'error',
        });
      } else {
        toast.add({
          title: 'Ошибка',
          description: error.value?.data?.message as string,
          icon: 'i-lucide-circle-x',
          color: 'error',
        });
      }
    }
  })

  return {
    isOpen,
    state,
    resetForm,
    ...response,
  }
}
