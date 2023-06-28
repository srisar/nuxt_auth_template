import { defineStore } from "pinia";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),

  actions: {
    async fetchTodos() {
      const { data }: any = await useFetch("https://jsonplaceholder.typicode.com/todos");
      if (data.value) {
        this.todos = data.value;
      }
    },
  },
});
