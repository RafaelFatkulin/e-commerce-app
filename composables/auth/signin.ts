import type { SignIn, SignInResponse } from '~/types/auth'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

export function useSignin(data: SignIn) {
  const nuxtApp = useNuxtApp()

  return useAsyncData<SuccessResponse<SignInResponse>, ErrorResponse>(
    'signin',
    async () => nuxtApp.$api('/signin', {
      method: 'POST',
      body: data,
    }),
    {
      immediate: false,
      dedupe: 'defer',
    },
  )
}
