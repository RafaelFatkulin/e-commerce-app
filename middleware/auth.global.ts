import { useCurrentUser } from "~/composables/auth/current-user"
import type { CurrentUser } from "~/types/auth"
import type { SuccessResponse } from "~/types/response"

export default defineNuxtRouteMiddleware(async (to) => {
  const { accessToken, refreshToken, user, updateCookies, updateUser } = useAuth()
  const { execute } = await useCurrentUser()
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  if (
    !accessToken.value
    && !refreshToken.value
    && to.path.includes('/dashboard')
  ) {
    return navigateTo('/')
  }

  if (refreshToken.value && !user) {
    execute()
  }

  if (user?.role === 'user' && to.path.includes('/dashboard')) {
    return navigateTo('/')
  }

  if (!user && !accessToken.value && refreshToken.value) {
    useFetch<
      SuccessResponse<{
        accessToken: string
        refreshToken: string
        accessExpiresAt: Date
        refreshExpiresAt: Date
        user: CurrentUser
      }>
    >('/refresh', {
      baseURL: apiUrl,
      method: 'POST',
      body: {
        refreshToken: refreshToken.value,
      },
      onResponse({ response }) {
        updateUser(response._data.data?.user || null)
        updateCookies({
          at: response._data.data?.accessToken || '',
          rt: response._data.data?.refreshToken || '',
          atExpiresAt: response._data.data?.accessExpiresAt || '',
          rtExpiresAt: response._data.data?.refreshExpiresAt || '',
        })
      },
      onResponseError: () => {
        updateCookies({
          at: '',
          rt: '',
          atExpiresAt: undefined,
          rtExpiresAt: undefined,
        })
        navigateTo('/')
      },
    })
  }
})
