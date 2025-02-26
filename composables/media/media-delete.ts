import type { Media } from "~/types/media"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useMediaDelete = (media: Media) => {
  const nuxtApp = useNuxtApp()
  const toast = useToast()

  const mediaToDelete = useState<Media | null>('media-to-delete', () => null)
  const isOpen = computed(() => !!mediaToDelete.value)

  const response = useAsyncData<SuccessResponse<null>, ErrorResponse>(
    `delete-media-${media.id}`,
    async () => nuxtApp.$api(`/media/${media.id}/delete`, {
      method: 'DELETE'
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  function setMediaToDelete(media?: Media) {
    mediaToDelete.value = media || null
  }

  return {
    ...response,
    setMediaToDelete,
    isOpen
  }
}
