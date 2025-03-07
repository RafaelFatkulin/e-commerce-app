import type { CurrentUser } from '~/types/auth'

export function useAuth() {
  const { user, setUser } = useAuthStore()

  const accessToken = useCookie('access_token', {
    maxAge: 60 * 15,
  })
  const refreshToken = useCookie('refresh_token', {
    maxAge: 60 * 60 * 24 * 7,
  })

  const isLoggedIn = computed(() => !!refreshToken.value && !!user)

  const updateUser = (userToSet: CurrentUser | null) => {
    setUser(userToSet)
  }

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

  return {
    accessToken,
    refreshToken,
    isLoggedIn,
    updateCookies,
    updateUser,
    user
  }
}
