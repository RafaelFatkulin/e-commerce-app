import type { CurrentUser } from '~/types/auth'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export async function useCurrentUser() {
  const nuxtApp = useNuxtApp()

  const { setUser } = useAuthStore()

  const response = await useAsyncData<SuccessResponse<CurrentUser>, ErrorResponse>(
    'signin',
    async () => nuxtApp.$api('/profile'),
    {
      immediate: true,
      dedupe: 'defer',
    },
  ).then((res) => {
    const user = res.data.value?.data
    if (user) {
      setUser(user)
    }

    return res
  })

  return { ...response }
}
