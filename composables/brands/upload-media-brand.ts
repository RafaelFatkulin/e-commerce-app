import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useUploadMediaBrand = (id: number, refreshFn: () => Promise<void>) => {
  const nuxtApp = useNuxtApp()
  const toast = useToast()

  const filesArray = useState<File[]>('brand-files-to-upload', () => [])

  const response = useAsyncData<SuccessResponse<null>, ErrorResponse>(
    'upload-brand-media',
    async () => {
      const formData = new FormData()
      if (filesArray.value?.length) {
        filesArray.value.forEach((file, index) => {
          formData.append(`files[${index}]`, file)
        })
      }

      return await nuxtApp.$api(`/brands/${id}/upload-media`, {
        method: 'POST',
        body: formData
      })
    },
    {
      immediate: false,
      lazy: true
    }
  )

  const { data, error, status, execute } = response

  const handleMediaUpload = async (files: File[]) => {
    filesArray.value = files
    await execute()
  }

  watch(status, (newStatus) => {
    if (newStatus === 'success') {
      toast.add({
        title: 'Успешно',
        description: data.value?.message ?? 'Бренд успешно создан',
        icon: 'i-lucide-circle-check',
        color: 'success'
      })
      refreshFn()
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
    ...response,
    handleMediaUpload
  }
}
