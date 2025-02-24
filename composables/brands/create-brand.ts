import type { Brand, CreateBrand } from "~/types/brands"
import { useGetBrands } from "./get-brands"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useCreateBrand = () => {
  const nuxtApp = useNuxtApp()
  const toast = useToast()

  // Modal state
  const isOpen = useState<boolean>('is-create-brand-modal-open', () => false)

  // Form state
  const state = reactive<Partial<CreateBrand>>({
    title: '',
    description: '',
    files: [] as File[]
  })

  // Reset form state
  const resetForm = () => {
    state.title = ''
    state.description = ''
    state.files = []
  }

  // Refresh brands list after creation
  const { refresh } = useGetBrands()

  // Async data fetch for creating a brand
  const response = useAsyncData<SuccessResponse<Brand>, ErrorResponse>(
    'create-brand',
    async () => {
      // Create FormData for multipart/form-data upload
      const formData = new FormData()
      if (state.title) formData.append('title', state.title)
      if (state.description) formData.append('description', state.description)
      if (state.files?.length) {
        state.files.forEach((file, index) => {
          formData.append(`files[${index}]`, file)
        })
      }

      // Make API request
      return await nuxtApp.$api('/brands', {
        method: 'POST',
        body: formData
        // No need to set 'Content-Type': 'multipart/form-data' manually
      })
    },
    {
      immediate: false,
      lazy: true
    }
  )

  const { data, status, error, execute } = response

  // Watch status changes to provide feedback
  watch(status, (newStatus) => {
    if (newStatus === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message ?? 'Бренд успешно создан',
        icon: 'i-lucide-circle-check',
        color: 'success'
      })
      isOpen.value = false
      resetForm()
      refresh()
    } else if (newStatus === 'error') {
      if (error.value?.data?.errors) {
        toast.add({
          title: error.value?.data?.message as string ?? 'Ошибка',
          description: error.value?.data?.errors.reduce((acc, curr) => {
            return acc.concat(`${curr.message}\n`)
          }, ''),
          icon: 'i-lucide-circle-x',
          color: 'error'
        })
      } else {
        toast.add({
          title: 'Ошибка',
          description: error.value?.data?.message as string ?? 'Не удалось создать бренд',
          icon: 'i-lucide-circle-x',
          color: 'error'
        })
      }
    }
  })

  return {
    isOpen,
    state,
    resetForm,
    execute, // Expose execute to trigger the request manually
    status,
    data,
    error
  }
}