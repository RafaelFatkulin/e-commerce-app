import type { SuccessResponse } from '~/types/response'

export async function useRefresh() {
  const {
    public: { apiUrl },
  } = useRuntimeConfig()

  const { refreshToken } = useAuth()

  return await $fetch<SuccessResponse<{ accessToken: string, refreshToken: string }>>('/refresh', {
    baseURL: apiUrl,
    method: 'POST',
    body: {
      refreshToken: refreshToken.value,
    },
  })
}
