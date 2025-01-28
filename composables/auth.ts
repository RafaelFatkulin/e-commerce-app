import type { ErrorResponse, SuccessResponse } from '~/types/response'
import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const { $api } = useNuxtApp()
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const { user, setUser } = useAuthStore()

  const accessToken = useCookie('access_token', {
    maxAge: 60 * 15,
  })
  const refreshToken = useCookie('refresh_token', {
    maxAge: 60 * 60 * 24 * 7,
  })
  // const user = useCookie<CurrentUser | null>('user', {
  //   maxAge: 60 * 15,
  // })
  const isLoggedIn = computed(() => !!refreshToken.value && user)

  const updateCookies = ({ at, rt, atExpiresAt, rtExpiresAt }: { at: string, rt: string, atExpiresAt: Date | undefined, rtExpiresAt: Date | undefined }) => {
    useCookie('access_token', {
      expires: atExpiresAt ? new Date(atExpiresAt) : undefined,
    })
    useCookie('refresh_token', {
      expires: rtExpiresAt ? new Date(rtExpiresAt) : undefined,
    })
    accessToken.value = at
    refreshToken.value = rt
  }

  const refresh = async () => {
    return await $fetch<SuccessResponse<{ accessToken: string, refreshToken: string }>>('/refresh', {
      baseURL: apiUrl,
      method: 'POST',
      body: {
        refreshToken: refreshToken.value,
      },
    })
  }

  const signOut = async () => {
    return await useAsyncData<SuccessResponse<null>, ErrorResponse>(
      'signout',
      () => $api('/signout', {
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
      }),
      { immediate: false },
    )
  }

  return {
    accessToken,
    refreshToken,
    user,
    isLoggedIn,
    updateCookies,
    refresh,
    signOut,
  }
}
