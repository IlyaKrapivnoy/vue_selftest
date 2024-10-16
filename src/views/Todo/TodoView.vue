<template>
  <HeadSetter
    :title="TODO_HEAD.title"
    :name="TODO_HEAD.name"
    :content="TODO_HEAD.content"
  />
  <main class="container mx-auto px-4 mt-20">
    <h1>TODO PAGE</h1>
    <form @submit.prevent="handleFormSubmit" class="flex flex-col mt-8">
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
        v-model="newTodoTitle"
        id="todoInput"
        class="mt-3"
        clearable
      />
      <div class="self-end mt-3">
        <el-button
          @click="toggleMarkAll"
          :disabled="!!paginatedTodos.length === 0"
          class="w-[140px]"
        >
          {{ getStatusButtonText }}
        </el-button>
        <el-button
          @click="removeAllTodos"
          :disabled="!!paginatedTodos.length === 0"
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
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="my-5 cursor-pointer"
        @click="toggleTodoStatus(todo)"
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
            <el-button type="danger" @click.stop="removeTodo(todo)">
              x
            </el-button>
          </div>
        </el-card>
      </li>
    </ul>
    <div class="flex justify-center my-5">
      <el-pagination
        layout="prev, pager, next"
        :total="totalTodoCount"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handlePageChange"
        v-show="paginatedTodos.length"
      />
    </div>
    <div
      v-show="paginatedTodos.length === 0"
      class="mt-4 text-center text-gray-500"
    >
      No todos to display.
    </div>
    <MySpinner v-show="isLoading" />
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { nanoid } from "nanoid";
import MySpinner from "@/components/common/MySpinner/MySpinner.vue";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";
import { TODO_HEAD } from "@/data/head";
import MyAlert from "@/components/common/MyAlert/MyAlert.vue";
import { Todo } from "@/types";

const loadUserNameFromLocalStorage = (): string | null => {
  return localStorage.getItem("username");
};

const userName = ref<string>(loadUserNameFromLocalStorage() || "Craig");
const newTodoTitle = ref<string>("");
const paginatedTodos = ref<Todo[]>([]);
const allTodos = ref<Todo[]>([]);
const isAlert = ref<boolean>(false);
const alertTimeout = ref<number | null>(null);
const alertMessage = ref<string>("");
const isLoading = ref<boolean>(true);

// pagination
const totalTodoCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);

const saveUserNameToLocalStorage = (): void => {
  localStorage.setItem("username", userName.value);
};

const handleFormSubmit = (): void => {
  if (!userName.value) {
    alertMessage.value = "Add username";
    showAlert();
    return;
  }

  const username = userName.value || "Craig";
  if (newTodoTitle.value) {
    const existingTodo = allTodos.value.find(
      (todo) =>
        todo.title === newTodoTitle.value.trim() && todo.createdBy === username
    );
    if (!existingTodo) {
      addTodo(newTodoTitle.value, username);
      newTodoTitle.value = "";
      isAlert.value = false;
    } else {
      alertMessage.value = "Todo with this title already exists for this user!";
      showAlert();
    }
  } else {
    alertMessage.value = "Add some text to create a todo";
    showAlert();
  }

  saveUserNameToLocalStorage();
};

const showAlert = (): void => {
  isAlert.value = true;
  clearTimeout(alertTimeout.value);
  alertTimeout.value = setTimeout(() => {
    isAlert.value = false;
  }, 3000);
};

const handlePageChange = (newPage: number): void => {
  currentPage.value = newPage;
  updateTodos(false);
};

const toggleTodoStatus = (todo: Todo): void => {
  todo.completed = !todo.completed;
  updateTodos(false);
};

const toggleMarkAll = (): void => {
  if (isAllDone.value) {
    paginatedTodos.value.forEach((todo) => (todo.completed = false));
  } else {
    paginatedTodos.value.forEach((todo) => (todo.completed = true));
  }
  updateTodos(false);
};

const removeAllTodos = (): void => {
  allTodos.value = [];
  updateTodos(true);
};

const isAllDone = computed<boolean>(() =>
  paginatedTodos.value.every((todo) => todo.completed)
);
const getStatusButtonText = computed<string>(() =>
  isAllDone.value ? "Unmark all done" : "Mark all done"
);

const addTodo = (title: string, username: string): void => {
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
  updateTodos(false);
};

const removeTodo = (todo: Todo): void => {
  allTodos.value = allTodos.value.filter((t) => t.id !== todo.id);
  updateTodos(false);
};

const updateTodos = (totalReset: boolean = false): void => {
  totalTodoCount.value = totalReset ? 0 : allTodos.value.length;
  paginatedTodos.value = getPaginatedTodos();
  saveTodosToLocalStorage();
};

const getPaginatedTodos = (): Todo[] => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return allTodos.value.slice(startIndex, endIndex);
};

const saveTodosToLocalStorage = (): void => {
  localStorage.setItem("todos", JSON.stringify(allTodos.value));
};

const loadTodosFromLocalStorage = (): void => {
  const savedTodos: string = localStorage.getItem("todos");
  if (savedTodos) {
    allTodos.value = JSON.parse(savedTodos);
    totalTodoCount.value = allTodos.value.length;
    paginatedTodos.value = getPaginatedTodos();
  }
};

onMounted((): void => {
  loadTodosFromLocalStorage();
  paginatedTodos.value = getPaginatedTodos();
  isLoading.value = false;
});
</script>

<style>
.bg-slate-400-card {
  background-color: #cbd5e0 !important;
}
</style>
