<template>
  <HeadSetter
    :title="TODO_HEAD.title"
    :name="TODO_HEAD.name"
    :content="TODO_HEAD.content"
  />
  <main class="container mx-auto px-4 mt-20">
    <h1>TODO PAGE</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col mt-8">
      <label for="userNameInput" class="text-lg font-bold">Name:</label>
      <el-input
        placeholder="Enter your name..."
        v-model="userName"
        id="userNameInput"
        class="mt-3 mb-6"
        clearable
      />

      <label for="todoInput" class="text-lg font-bold">New todo:</label>
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
          :disabled="!!todos.length === 0"
          class="w-[140px]"
        >
          {{ getStatusButtonText }}
        </el-button>
        <el-button
          @click="removeAllTodos"
          :disabled="!!todos.length === 0"
          class="w-[140px]"
        >
          Remove all todos
        </el-button>
        <el-button native-type="submit" type="primary" class="w-[140px]">
          Add todo
        </el-button>
      </div>
    </form>
    <MyAlert
      :isAlert="isAlert"
      :wrapperClass="'mt-6'"
      :title="alertMessage"
      :type="'error'"
      :showIcon="false"
      :closable="false"
    />
    <ul class="mt-10">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="my-5 cursor-pointer"
        @click="toggleDone(todo)"
      >
        <el-card :class="['box-card', { 'bg-slate-400-card': todo.completed }]">
          <div class="flex justify-between items-center">
            <div>
              <h3
                :class="{ 'line-through': todo.completed }"
                class="cursor-pointer pr-[50px]"
              >
                TODO: {{ todo.title }}
              </h3>
              <p class="text-sm text-gray-400">
                Created at: {{ todo.createdAt }}
              </p>
              <p class="text-sm text-gray-400">
                Created by: {{ todo.createdBy }}
              </p>
            </div>
            <el-button type="danger" @click.stop="deleteItem(todo)">
              x
            </el-button>
          </div>
        </el-card>
      </li>
    </ul>
    <div class="flex justify-center my-5">
      <el-pagination
        layout="prev, pager, next"
        :total="totalTodos"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handlePageChange"
        v-show="todos.length"
      />
    </div>
    <div v-show="todos.length === 0" class="mt-4 text-center text-gray-500">
      No todos to display.
    </div>
    <MySpinner v-show="isLoading" />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { nanoid } from "nanoid";
import MySpinner from "@/components/common/MySpinner/MySpinner.vue";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";
import { TODO_HEAD } from "@/data/head";
import MyAlert from "@/components/common/MyAlert/MyAlert.vue";

const newTodo = ref("");
const todos = ref([]);
const allTodos = ref([]);
const userName = ref("") || "Craig";
const isAlert = ref(false);
const alertTimeout = ref(null);
const alertMessage = ref("");
const isLoading = ref(true);

// pagination
const totalTodos = ref(0);
const currentPage = ref(1);
const pageSize = ref(5);

const handleSubmit = () => {
  if (!userName.value) {
    alertMessage.value = "Add username";
    triggerAlert();
    return;
  }

  const username = userName.value || "Craig";
  if (newTodo.value) {
    if (!allTodos.value.some((todo) => todo.title === newTodo.value.trim())) {
      addTodo(newTodo.value, username);
      newTodo.value = "";
      isAlert.value = false;
    } else {
      alertMessage.value = "Todo with this title already exists!";
      triggerAlert();
    }
  } else {
    alertMessage.value = "Add some text to create a todo";
    triggerAlert();
  }
};

const triggerAlert = () => {
  isAlert.value = true;
  clearTimeout(alertTimeout.value);
  alertTimeout.value = setTimeout(() => {
    isAlert.value = false;
  }, 3000);
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  todos.value = getPaginatedTodos();
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

const deleteItem = (todo) => {
  deleteTodo(todo);
};

const removeAllTodos = () => {
  allTodos.value = [];
  todos.value = getPaginatedTodos();
  totalTodos.value = 0;
  saveTodosToLocalStorage();
};

const isAllDone = computed(() =>
  allTodos.value.every((todo) => todo.completed)
);
const getStatusButtonText = computed(() =>
  isAllDone.value ? "Unmark all done" : "Mark all done"
);

const addTodo = (title, username) => {
  const uniqueId = nanoid();
  const currentDateTime = new Date().toLocaleString();
  const newTodo = {
    title: title,
    completed: false,
    id: uniqueId,
    createdAt: currentDateTime,
    createdBy: username,
  };

  allTodos.value.unshift(newTodo);
  totalTodos.value += 1;
  todos.value = getPaginatedTodos();
  saveTodosToLocalStorage();
};

const deleteTodo = (todo) => {
  allTodos.value = allTodos.value.filter((t) => t.id !== todo.id);
  totalTodos.value -= 1;
  todos.value = getPaginatedTodos();
  saveTodosToLocalStorage();
};

const getPaginatedTodos = () => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return allTodos.value.slice(startIndex, endIndex);
};

const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(allTodos.value));
};

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    allTodos.value = JSON.parse(savedTodos);
    totalTodos.value = allTodos.value.length;
    todos.value = getPaginatedTodos();
  }
};

onMounted(() => {
  loadTodosFromLocalStorage();
  todos.value = getPaginatedTodos();
  isLoading.value = false;
});
</script>

<style>
.bg-slate-400-card {
  background-color: #cbd5e0 !important;
}
</style>
