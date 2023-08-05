import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookshelfView from "@/views/BookshelfView.vue";
import ShopListView from "@/views/ShopListView.vue";
import SingleBook from "@/views/SingleBook.vue";
import SingleShop from "@/views/SingleShop.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/bookshelf",
    component: BookshelfView,
  },
  {
    path: "/bookshelf/:title",
    component: SingleBook,
  },
  {
    path: "/shoplist",
    component: ShopListView,
  },
  {
    path: "/shoplist/:title",
    component: SingleShop,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
