/**
 *
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated, loadToken } = useAuth();

  loadToken();

  if (!authenticated.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (authenticated.value && to.path === "/login") {
    return navigateTo("/");
  }
});
