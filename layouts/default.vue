<script setup lang="ts">
const { logout, authenticated, authUser } = useAuth();
</script>

<template>
  <header class="container p-4 bg-base-300 rounded-lg mx-auto my-5">
    <ul class="flex items-center gap-4">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">about</NuxtLink>
      </li>
      <li class="mr-auto">
        <NuxtLink to="/todo">Todos</NuxtLink>
      </li>
      <li>
        <div class="flex items-center gap-5">
          <div v-if="authUser" class="flex gap-5 items-center">
            <div>{{ authUser.email }}</div>

            <div class="avatar">
              <div class="w-12 rounded-full border">
                <img :src="authUser.image" alt="User profile image" />
              </div>
            </div>
          </div>

          <NuxtLink to="/login" class="btn btn-primary" v-if="!authenticated">Login</NuxtLink>
          <button class="btn btn-primary" v-else @click="logout">logout</button>
        </div>
      </li>
    </ul>
  </header>

  <main class="container mx-auto">
    <slot></slot>
  </main>

  <footer></footer>
</template>

<style scoped></style>
