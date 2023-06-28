import { defineStore } from "pinia";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  image: string;
  gender: string;
}

/* ---------------------------------------------------------------------------------------------- */

export const useAuthStore = defineStore("auth", () => {
  const authenticated = ref(false);
  const loading = ref(false);

  /**
   * Authenticate user
   * @param username
   * @param password
   */
  async function authenticateUser({ username, password }: LoginPayload) {
    const { data, pending, execute } = useFetch<LoginResponse>("https://dummyjson.com/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: {
        username,
        password,
      },
      immediate: false,
    });

    watchEffect(() => {
      loading.value = pending.value;
    });

    await execute();

    if (data.value) {
      const token = useAuthTokenCookie();
      token.value = data.value.token;
      authenticated.value = true;
    }
  }

  /**
   *  Logout user
   */
  function clearAuthentication() {
    const token = useAuthTokenCookie();
    token.value = null;
    authenticated.value = false;
  }

  return { authenticated, loading, authenticateUser, clearAuthentication };
});
