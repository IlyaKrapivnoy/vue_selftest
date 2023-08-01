import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/bookshelf",
    name: "bookshelf",
    component: () => import("../views/BookshelfView.vue"),
  },
  {
    path: "/shoplist",
    name: "shoplist",
    component: () => import("../views/ShopListView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
