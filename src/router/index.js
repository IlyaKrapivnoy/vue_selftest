import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import BookshelfView from "@/views/Bookshelf/BookshelfView.vue";
import SingleBook from "@/views/Bookshelf/SingleBook.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
