import type { MediaOrderChange } from '~/types/media'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useMediaOrderChange() {
  const nuxtApp = useNuxtApp()

  const itemsToChange = useState<MediaOrderChange | null>(
    'items-to-change-media-order',
    () => null,
  )

  const response = useAsyncData<SuccessResponse<null>, ErrorResponse>(
    'media-ordero-change',
    async () => nuxtApp.$api('/media/change-order', {
      method: 'post',
      body: itemsToChange.value,
    }),
    {
      immediate: false,
      watch: [itemsToChange],
    },
  )

  const updateMediaOrder = (items: MediaOrderChange) => {
    itemsToChange.value = items
  }

  return {
    ...response,
    updateMediaOrder,
  }
}
