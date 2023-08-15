import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import TodoView from "@/views/Todo/TodoView.vue";
import QuotesView from "@/views/Quotes/QuotesView.vue";
import QuizView from "@/views/Quiz/QuizView.vue";
import SadBandNames from "@/views/SadBandNames/SadBandNames.vue";

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
  {
    path: "/quiz",
    component: QuizView,
  },
  {
    path: "/band-names",
    component: SadBandNames,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
