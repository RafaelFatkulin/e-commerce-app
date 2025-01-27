export default defineNuxtPlugin((nuxtApp) => {
//   const { accessToken, refreshToken, refresh, updateCookies, updateUser } = useAuth()

  //   const {
  //     public: { apiUrl },
  //   } = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: nuxtApp.$config.public.apiUrl,
    credentials: 'include',
    retry: 3,
    retryStatusCodes: [401],
    // onRequest({ request, options, error }) {
    //   if (accessToken.value) {
    //     options.headers.set('Authorization', `Bearer ${accessToken.value}`)
    //   }
    // },
    // async onResponseError({ request, response, error, options }) {
    //   if (response.status === 401) {
    //     await $fetch<
    //       SuccessResponse<{ accessToken: string, refreshToken: string }>
    //     >('/auth/refresh', {
    //       baseURL: apiUrl,
    //       method: 'POST',
    //       body: {
    //         refreshToken: refreshToken.value,
    //       },
    //       onResponse({ request, response, options }) {
    //         updateCookies({
    //           at: response._data.data?.accessToken || '',
    //           rt: response._data.data?.refreshToken || '',
    //         })
    //       },
    //       onResponseError: (err) => {
    //         updateCookies({
    //           at: '',
    //           rt: '',
    //         })
    //         updateUser(null)
    //         navigateTo('/sign-in')
    //       },
    //     })
    //   }
    // },
  })

  return {
    provide: {
      api,
    },
  }
})
