<script setup lang="ts">
/* ---------------------------------------------------------------------------------------------- */

definePageMeta({
  layout: 'login',
});

/* ---------------------------------------------------------------------------------------------- */

const { userForm, loading, login } = useAuth();

async function doLogin() {
  const { to } = useRoute().query;

  await login(to);
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="bg-base-200 p-4 rounded-2xl w-[32rem]">
      <header class="mb-5">
        <h1 class="text-3xl font-bold">Login</h1>
      </header>

      <div class="flex flex-col gap-5 items-center w-full">
        <div class="form-control w-full">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Username"
            v-model="userForm.username"
          />
        </div>

        <div class="form-control w-full">
          <input
            type="password"
            class="input input-bordered"
            placeholder="Password"
            v-model="userForm.password"
          />
        </div>

        <button class="btn btn-wide btn-primary" @click="doLogin">
          <span class="loading loading-spinner" v-if="loading"></span>
          <span v-else>Login</span>
        </button>

        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>