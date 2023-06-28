<script setup lang="ts">
import { useTodosStore } from "~/stores/todos";
import { storeToRefs } from "pinia";
import { awaitExpression } from "@babel/types";

const store = useTodosStore();

const { todos } = storeToRefs(store);

await store.fetchTodos();
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-5">Home page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur autem commodi
      doloremque enim error harum incidunt, inventore optio, possimus praesentium quam quo
      reiciendis rerum sint suscipit veniam vitae voluptatem!
    </p>

    <div class="mb-5"></div>

    <h2 class="text-2xl font-bold mb-5">Todos</h2>

    <div v-for="todo in todos">
      <p :class="[todo.completed ? 'line-through text-primary/20' : '']">{{ todo.title }}</p>
    </div>
  </div>
</template>

<style scoped></style>