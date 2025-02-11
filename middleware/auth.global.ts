export default defineNuxtRouteMiddleware((to, from) => {
  const { accessToken, refreshToken, user } = useAuth()

  if (
    !accessToken.value
    && !refreshToken.value
    && to.path.includes('/dashboard')
  ) {
    return navigateTo('/')
  }

  if (user?.role === 'user' && to.path.includes('/dashboard')) {
    return navigateTo('/')
  }
})
