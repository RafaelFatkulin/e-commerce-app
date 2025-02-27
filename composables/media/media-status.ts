import type { Status } from "~/types/base"
import type { Media } from "~/types/media"
import type { ErrorResponse, SuccessResponse } from "~/types/response"

export const useMediaStatus = () => {
  const nuxtApp = useNuxtApp()

  const mediaToUpdateStatus = useState<Media | null>('media-to-update-status', () => null)
  const isOpen = ref(false)

  function setMediaToUpdateStatus(media?: Media) {
    console.log(media);

    mediaToUpdateStatus.value = media || null
    console.log(mediaToUpdateStatus.value?.alt);
    isOpen.value = !!media
  }

  watch(isOpen, () => console.log(isOpen.value))

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
    isOpen
  }
}
