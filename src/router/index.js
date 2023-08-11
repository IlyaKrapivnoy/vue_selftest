import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import MyPosts from "@/views/Posts/MyPosts.vue";
import SinglePost from "@/views/Posts/SinglePost.vue";
import TodoView from "@/views/Todo/TodoView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/posts",
    component: MyPosts,
  },
  {
    path: "/posts/:title",
    component: SinglePost,
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
