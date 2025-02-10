export default defineNuxtRouteMiddleware((to, from) => {
  const { accessToken, refreshToken, user } = useAuth();
  console.log(accessToken, refreshToken, user, to.path.includes("/dashboard"));

  if (
    !accessToken.value &&
    !refreshToken.value &&
    to.path.includes("/dashboard")
  ) {
    return navigateTo("/");
  }
});
