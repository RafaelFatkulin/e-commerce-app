import type { CurrentUser } from '~/types/auth'
import type { SuccessResponse } from '~/types/response'

export default defineNuxtPlugin((nuxtApp) => {
  const { accessToken, refreshToken, updateCookies, updateUser } = useAuth()

  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: nuxtApp.$config.public.apiUrl,
    credentials: 'include',
    retry: 3,
    retryStatusCodes: [401],
    onRequest({ options }) {
      if (accessToken.value) {
        options.headers.set('Authorization', `Bearer ${accessToken.value}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await $fetch<
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
    },
  })

  return {
    provide: {
      api,
    },
  }
})
