/* ---------------------------------------------------------------------------------------------- */

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
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

/**
 *  Composable responsible for handling auth and injecting auth token,
 *  as well as clearing authentication data
 */
export default function () {
  const authToken = useCookie('auth_token');

  const authenticated = useState('authenticated', () => false);

  const loading = ref(false);

  const userForm = ref<ILoginPayload>({
    username: 'kminchelle',
    password: '0lelplR',
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
    await _authenticateUser(userForm.value);

    if (authenticated.value) {
      navigateTo('/');
    }
  };

  /**
   * Logout
   */
  function logout() {
    _clearAuthentication();
    navigateTo('/login');
  }

  /**
   * @private
   * Authenticate user and set cookie
   * @param username
   * @param password
   */
  const _authenticateUser = async ({ username, password }: ILoginPayload) => {
    const { data, pending, execute } = useFetch<ILoginResponse>(
      'https://dummyjson.com/auth/login',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          username,
          password,
        },
        immediate: false,
      }
    );

    watchEffect(() => {
      loading.value = pending.value;
    });

    await execute();

    if (data.value) {
      authToken.value = data.value.token;
      authenticated.value = true;
    }
  };

  /**
   * Clear auth token from the cooke and set authenticated status to false
   */
  function _clearAuthentication() {
    authToken.value = null;
    authenticated.value = false;
  }

  return {
    userForm,
    authToken,
    authenticated,
    login,
    logout,
    loading,
    loadToken,
  };
}
