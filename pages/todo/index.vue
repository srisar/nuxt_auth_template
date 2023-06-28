<script setup lang="ts">
/* ---------------------------------------------------------------------------------------------- */

definePageMeta({
  middleware: ['auth'],
});

/* ---------------------------------------------------------------------------------------------- */
/*
 * Fetching todo-items
 */

interface TodoResponse {
  id: number;
  title: string;
  completed: boolean;
}

const { data: todos, pending } = useFetch<TodoResponse[]>('https://jsonplaceholder.typicode.com/todos');

/* ---------------------------------------------------------------------------------------------- */
</script>

<template>
  <h2 class="text-2xl font-bold mb-5">Todos</h2>

  <div class="flex justify-center" v-if="pending">
    <div class="loading w-32"></div>
  </div>

  <div v-for="x in todos">
    <p :class="[x.completed ? 'line-through text-primary/20' : '']">{{ x.title }}</p>
  </div>
</template>

<style scoped></style>
