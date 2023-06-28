# Nuxt 3 with authentication system template

This is an example implementation for authentication using composable and cookie.

Using `https://dummyjson.com/` as auth data provider.

## useAuth Composable

Login, logout, authentication flow and cookie management is done using this composable.

This composable exposes the following

+ userForm - `ref<ILoginPayload>({username, password})`
+ authToken - `useCookie('auth_token')`
+ authUser - `useCookie<IAuthUser>('auth_user')`
+ loading - `boolean`
+ authenticated - `boolean`
+ login - `function`
+ logout - `function`
+ loadToken - `function`

## Interfaces defined in the composable

`ILoginPayload` is used for `userForm`

```typescript
export interface ILoginPayload {
  username: string;
  password: string;
}
```

`ILoginResponse` is used to type the response send from the server.
The [dummyjson.com](https://dummyjson.com) send the following attributes.

```typescript
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
```

`IAuthUser` is used to type logged-in user details.

```typescript
export interface IAuthUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}
```

## Breakdown of exposed properties

### `userForm`

This gives us both `username` and `password` fields to bind to the login form.

### `authToken`

This is the token cookie.

### `authUser`

This is a cookie containing the logged-in user details. Typed as IAuthUser.

### `loading`

Boolean ref that is set as true when login fetch is initiated. As soon as the fetch
receive any data from the server, it will be false again.

### `authenticated`

Boolean ref that tracks the authenticated state. Set as true if login succeeds, or
authToken cookie is set with valid token.

### `login()`

Function that sends the auth request to the server.

### `logout()`

Function that clears the authCookie and redirect back to login page.

### `loadToken()`

Function that loads the token from authCookie and set authenticated state.
Used in the middleware.


## Auth Global Middleware
This middleware is registered as global and runs on all routes.