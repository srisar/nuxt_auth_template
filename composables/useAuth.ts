import { storeToRefs } from "pinia";
import { LoginPayload, useAuthStore } from "~/stores/auth";

export default function () {
  const authToken = useAuthTokenCookie();
  const { authenticated, loading } = storeToRefs(useAuthStore());
  const { authenticateUser, clearAuthentication } = useAuthStore();

  const userForm = ref<LoginPayload>({
    username: "kminchelle",
    password: "0lelplR",
  });

  /**
   * Load token from the cookie
   */
  const loadToken = () => {
    if (authToken.value) authenticated.value = true;
  };

  /**
   * Login
   */
  const login = async () => {
    await authenticateUser(userForm.value);

    if (authenticated.value) {
      navigateTo("/");
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    clearAuthentication();
    navigateTo("/login");
  };

  return { userForm, authToken, authenticated, login, logout, loading, loadToken };
}
