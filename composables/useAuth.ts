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

export interface IAuthUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

/* ---------------------------------------------------------------------------------------------- */

/**
 *  Composable responsible for handling auth and injecting auth token,
 *  as well as clearing authentication data
 */
export default function () {
  const authToken = useCookie('auth_token');
  const authUser = useCookie<IAuthUser | null>('auth_user');

  const authenticated = useState('authenticated', () => false);

  const loading = ref(false);

  const userForm = ref<ILoginPayload>({
    username: 'kminchelle',
    password: '0lelplR',
  });

  /* -------------------------------------------------------------------------------------------- */

  /**
   * Load token from the cookie
   */
  function loadToken() {
    console.log('loading token data from cookie');
    if (authToken.value) authenticated.value = true;
  }

  /* -------------------------------------------------------------------------------------------- */

  /**
   * Login
   */
  async function login(to: any | undefined = undefined) {
    await _authenticateUser(userForm.value);

    if (!authenticated.value) return;

    if (to) {
      navigateTo(to);
    } else {
      navigateTo('/');
    }
  }

  /* -------------------------------------------------------------------------------------------- */

  /**
   * Logout
   */
  function logout() {
    _clearAuthentication();
    navigateTo('/login');
  }

  /* -------------------------------------------------------------------------------------------- */

  /**
   * Authenticate user and set cookie
   * @param username
   * @param password
   */
  async function _authenticateUser({ username, password }: ILoginPayload) {
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
      /*
       * setting auth user & token
       */
      authToken.value = data.value.token;

      authUser.value = {
        username: data.value.username,
        email: data.value.email,
        firstName: data.value.firstName,
        lastName: data.value.lastName,
        image: data.value.image,
      };

      authenticated.value = true;
    }
  }

  /* -------------------------------------------------------------------------------------------- */

  /**
   * Clear auth token from the cooke and set authenticated status to false
   */
  function _clearAuthentication() {
    authToken.value = null;
    authUser.value = null;
    authenticated.value = false;
  }

  /* -------------------------------------------------------------------------------------------- */

  return {
    userForm,
    authToken,
    authUser,
    authenticated,
    login,
    logout,
    loading,
    loadToken,
  };
}
