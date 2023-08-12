import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import TodoView from "@/views/Todo/TodoView.vue";
import QuotesView from "@/views/Quotes/QuotesView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/todo",
    component: TodoView,
  },
  {
    path: "/quotes",
    component: QuotesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
