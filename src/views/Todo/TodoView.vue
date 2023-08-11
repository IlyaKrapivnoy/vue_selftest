<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>TODO PAGE</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col mt-8">
      <label for="todoInput" class="text-lg font-bold">Add new todo</label>
      <el-input
        placeholder="Enter your task..."
        v-model="newTodo"
        id="todoInput"
        class="mt-3"
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
        <el-button
          @click="requestFetchTodos"
          :disabled="todos.length"
          class="w-[140px]"
        >
          Get todos
        </el-button>
        <el-button native-type="submit" type="primary" class="w-[140px]">
          Add todo
        </el-button>
      </div>
    </form>

    <ul class="mt-10">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="my-5 cursor-pointer"
        @click="toggleDone(todo)"
      >
        <el-card :class="['box-card', { 'bg-slate-400-card': todo.completed }]">
          <div class="flex justify-between items-center">
            <h3
              :class="{ 'line-through': todo.completed }"
              class="cursor-pointer pr-[50px]"
            >
              TODO: {{ todo.title }}
            </h3>
            <el-button type="danger" @click.stop="deleteItem(todo)"
              >x</el-button
            >
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
import { computed, onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const newTodo = ref("");
    const todos = ref([]);
    const showAlert = ref(false);
    const alertTimeout = ref(null);

    const handleSubmit = () => {
      if (newTodo.value) {
        requestAddTodo(newTodo.value);
        newTodo.value = "";
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
      todo.completed = !todo.completed;
    };

    const toggleMarkAll = () => {
      if (isAllDone.value) {
        todos.value.forEach((todo) => (todo.completed = false));
      } else {
        todos.value.forEach((todo) => (todo.completed = true));
      }
    };

    const removeMockedItem = (todo) => {
      todos.value = todos.value.filter((el) => el.id !== todo.id);
    };

    const deleteItem = (todo) => {
      requestDeleteTodo(todo);
    };

    const removeAllTodos = () => {
      todos.value = [];
    };

    const isAllDone = computed(() =>
      todos.value.every((todo) => todo.completed)
    );

    const getStatusButtonText = () => {
      return isAllDone.value ? "Unmark all done" : "Mark all done";
    };

    const requestFetchTodos = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          todos.value = response.data.reverse();
          console.log("response.data", response.data);
        })
        .catch((error) => {
          console.error("Error fetching todos:", error);
        });
    };

    const requestAddTodo = (title) => {
      const newTodo = {
        title: title,
        completed: false,
        userId: 1,
      };

      axios
        .post("https://jsonplaceholder.typicode.com/todos", newTodo)
        .then((response) => {
          console.log("Todo added:", response.data);
          // Update your todos array with the newly added todo
          todos.value.unshift(response.data);
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    };

    const requestDeleteTodo = (todo) => {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        .then(() => {
          todos.value = todos.value.filter((t) => t.id !== todo.id);
        })
        .catch((error) => {
          console.error("Error deleting todo:", error);
        });
    };

    onMounted(() => {
      requestFetchTodos();
    });

    return {
      newTodo,
      handleSubmit,
      toggleDone,
      toggleMarkAll,
      deleteItem,
      removeMockedItem,
      removeAllTodos,
      requestFetchTodos,
      requestAddTodo,
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
