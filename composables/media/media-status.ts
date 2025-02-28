import type { Status } from "~/types/base"
import type { Media } from "~/types/media"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useMediaStatus = () => {
  const nuxtApp = useNuxtApp()

  const mediaToUpdateStatus = useState<Media | null>('media-to-update-status', () => null)
  const isOpen = ref(false)

  function setMediaToUpdateStatus(media?: Media) {
    mediaToUpdateStatus.value = media || null
  }

  watch(mediaToUpdateStatus, (newValue) => {
    isOpen.value = !!newValue
  })

  const response = useAsyncData<SuccessResponse<null>, ErrorResponse>(
    `update-status-media-${mediaToUpdateStatus.value?.id}`,
    async () => nuxtApp.$api<SuccessResponse<null>>(`/media/${mediaToUpdateStatus.value?.id}/change-status`, {
      method: 'PATCH',
      body: {
        status: (mediaToUpdateStatus.value?.status === 'active' ? 'not-active' : 'active') as Status
      }
    }),
    {
      immediate: false,
      lazy: true
    }
  )

  return {
    ...response,
    setMediaToUpdateStatus,
    mediaToUpdateStatus,
    isOpen
  }
}
