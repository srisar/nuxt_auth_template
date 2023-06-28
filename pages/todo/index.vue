<script setup lang="ts">
import { useTodosStore } from '~/stores/todos';
import { storeToRefs } from 'pinia';

/* ---------------------------------------------------------------------------------------------- */

definePageMeta({
  middleware: ['auth'],
});

/* ---------------------------------------------------------------------------------------------- */

const store = useTodosStore();

const { todos } = storeToRefs(store);

await store.fetchTodos();
</script>

<template>
  <h2 class="text-2xl font-bold mb-5">Todos</h2>

  <div v-for="todo in todos">
    <p :class="[todo.completed ? 'line-through text-primary/20' : '']">{{ todo.title }}</p>
  </div>
</template>

<style scoped></style>