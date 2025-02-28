import type { Media } from '~/types/media'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useMediaDelete() {
  const nuxtApp = useNuxtApp()

  const mediaToDelete = useState<Media | null>('media-to-delete', () => null)
  const isOpen = ref(false)

  function setMediaToDelete(media?: Media) {
    mediaToDelete.value = media || null
  }

  watch(mediaToDelete, (newValue) => {
    isOpen.value = !!newValue
  })

  const response = useAsyncData<SuccessResponse<null>, ErrorResponse>(
    `delete-media-${mediaToDelete.value?.id}`,
    async () => nuxtApp.$api(`/media/${mediaToDelete.value?.id}/delete`, {
      method: 'DELETE',
    }),
    {
      immediate: false,
      lazy: true,
    },
  )

  return {
    ...response,
    mediaToDelete,
    setMediaToDelete,
    isOpen,
  }
}
