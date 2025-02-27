import type { Media } from "~/types/media"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useMediaDelete = () => {
  const nuxtApp = useNuxtApp()

  const mediaToDelete = useState<Media | null>('media-to-delete', () => null)
  const isOpen = ref(false)

  const response = useAsyncData<SuccessResponse<null>, ErrorResponse>(
    `delete-media-${mediaToDelete.value?.id}`,
    async () => nuxtApp.$api(`/media/${mediaToDelete.value?.id}/delete`, {
      method: 'DELETE'
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  function setMediaToDelete(media?: Media) {
    mediaToDelete.value = media || null
    isOpen.value = !!media
  }

  return {
    ...response,
    setMediaToDelete,
    isOpen
  }
}
