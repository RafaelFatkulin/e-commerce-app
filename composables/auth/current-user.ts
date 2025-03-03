import type { CurrentUser } from '~/types/auth'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export async function useCurrentUser() {
  const nuxtApp = useNuxtApp()

  const { updateUser } = useAuth()

  const response = await useAsyncData<SuccessResponse<CurrentUser>, ErrorResponse>(
    'signin',
    async () => nuxtApp.$api('/profile'),
    {
      immediate: false,
      dedupe: 'defer',
    },
  )

  const { data, status } = response

  watch(status, () => {
    if (status.value === 'success') {
      updateUser(data.value?.data || null)
    }
  })

  return { ...response }
}
