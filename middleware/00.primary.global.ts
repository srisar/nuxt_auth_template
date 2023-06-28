export default defineNuxtRouteMiddleware((to) => {
  /*
   * Loading auth token, if any
   */
  const { loadToken } = useAuth();
  loadToken();
});
