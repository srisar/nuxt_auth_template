/**
 *
 */
export default defineNuxtRouteMiddleware((to) => {
  const { authenticated, loadToken } = useAuth();

  loadToken();

  if (!authenticated.value && to.path !== '/login') {
    return navigateTo({
      path: '/login',
      query: {
        to: to.path,
      },
    });
  }

  if (authenticated.value && to.path === '/login') {
    return navigateTo('/');
  }
});
