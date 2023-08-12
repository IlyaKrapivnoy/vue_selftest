import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import TodoView from "@/views/Todo/TodoView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/todo",
    component: TodoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
