<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>TODO PAGE</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col">
      <label for="todoInput" class="text-lg font-bold">Add new todo</label>
      <el-input
        placeholder="Enter your task..."
        v-model="newTodo"
        id="todoInput"
        clearable
      />

      <div class="self-end mt-3">
        <el-button
          @click="toggleMarkAll"
          :disabled="todos.length === 0"
          class="w-[140px]"
        >
          {{ getStatusButtonText() }}
        </el-button>
        <el-button
          @click="removeAllTodos"
          :disabled="todos.length === 0"
          class="w-[140px]"
        >
          Remove all todos
        </el-button>
        <el-button native-type="submit" type="primary" class="w-[140px]">
          Add
        </el-button>
      </div>
    </form>

    <ul class="mt-8">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="my-5 cursor-pointer"
        @click="toggleDone(todo)"
      >
        <el-card :class="['box-card', { 'bg-slate-400-card': todo.done }]">
          <div class="flex justify-between items-center">
            <h3 :class="{ 'line-through': todo.done }" class="cursor-pointer">
              TODO: {{ todo.content }}
            </h3>
            <el-button type="danger" @click="removeItem(todo)">x</el-button>
          </div>
        </el-card>
      </li>
    </ul>

    <el-alert
      v-show="showAlert"
      title="Add some text to create a todo"
      type="error"
    />

    <div v-show="todos.length === 0" class="mt-4 text-center text-gray-500">
      No todos to display.
    </div>
  </main>
</template>

<script>
import { computed, ref } from "vue";
import { nanoid } from "nanoid";

export default {
  setup() {
    const newTodo = ref("");
    const todos = ref([]);
    const showAlert = ref(false);
    const alertTimeout = ref(null);

    const handleSubmit = () => {
      if (newTodo.value) {
        todos.value.push({
          id: nanoid(),
          done: false,
          content: newTodo.value,
        });
        newTodo.value = "";
        console.log("todos", todos);

        showAlert.value = false;
      } else {
        showAlert.value = true;

        clearTimeout(alertTimeout.value);

        alertTimeout.value = setTimeout(() => {
          showAlert.value = false;
        }, 3000);
      }
    };

    const toggleDone = (todo) => {
      todo.done = !todo.done;
    };

    const toggleMarkAll = () => {
      if (isAllDone.value) {
        todos.value.forEach((todo) => (todo.done = false));
      } else {
        todos.value.forEach((todo) => (todo.done = true));
      }
    };

    const removeItem = (todo) => {
      todos.value = todos.value.filter((el) => el.id !== todo.id);
    };

    const removeAllTodos = () => {
      todos.value = [];
    };

    const isAllDone = computed(() => todos.value.every((todo) => todo.done));

    const getStatusButtonText = () => {
      return isAllDone.value ? "Unmark all done" : "Mark all done";
    };

    return {
      newTodo,
      handleSubmit,
      toggleDone,
      toggleMarkAll,
      removeItem,
      removeAllTodos,
      getStatusButtonText,
      showAlert,
      todos,
    };
  },
};
</script>

<style>
.bg-slate-400-card {
  background-color: #cbd5e0 !important;
}
</style>
