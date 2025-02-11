import type { SuccessResponse } from '~/types/response'

export async function useSignout() {
  const { $api } = useNuxtApp()
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const { setUser } = useAuthStore()
  const { refreshToken, updateCookies } = useAuth()

  const execute = async () => await $api<SuccessResponse<null>>('/signout', {
    baseURL: apiUrl,
    method: 'POST',
    body: {
      refreshToken: refreshToken.value,
    },
    onResponse() {
      updateCookies({
        at: '',
        rt: '',
        atExpiresAt: undefined,
        rtExpiresAt: undefined,
      })
      setUser(null)
      navigateTo('/')
    },
  })

  return { execute }
}
