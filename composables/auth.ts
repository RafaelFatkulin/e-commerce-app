import type { CurrentUser, SignIn, SignInResponse } from '~/types/auth'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useAuth() {
  const { $api } = useNuxtApp()
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const user = useCookie<CurrentUser | null>('user')
  const isLoggedIn = computed(() => !!user.value)

  const updateCookies = ({ at, rt }: { at: string, rt: string }) => {
    accessToken.value = at
    refreshToken.value = rt
  }
  const updateUser = (value: CurrentUser | null) => {
    user.value = value
  }

  const signIn = ({ email, password }: SignIn) => {
    console.log('@email', email);
    console.log('@password', password);
    
    return useAsyncData<
      SuccessResponse<SignInResponse>,
      ErrorResponse
    >(
      'sign-in',
      () => $api('/signin', {
        baseURL: apiUrl,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
      { immediate: false },
    )
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

  const getCurrentUser = async () => {
    return await $api<SuccessResponse<CurrentUser>>('/profile', {
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      onResponse({ response }) {
        if (response.ok && response._data) {
          updateUser(response._data.data)
        }
      },
    })
  }

  const signOut = async () => {
    return await $api<SuccessResponse<null>>('/signout', {
      baseURL: apiUrl,
      method: 'POST',
      body: {
        refreshToken: refreshToken.value,
      },
      onResponse() {
        updateCookies({ at: '', rt: '' })
        updateUser(null)
        navigateTo('/')
      },
    })

    // if(!response){
    //     return
    // }

    // if(response.message) {
    //     updateCookies({at: "", rt: ""})
    //     updateUser(null)
    //     return navigateTo('/')
    // }
  }

  return {
    user,
    isLoggedIn,
    updateCookies,
    updateUser,
    signIn,
    refresh,
    getCurrentUser,
    signOut,
  }
}
