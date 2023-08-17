import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./main.css";
import components from "./components";
import directives from "@/directives";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createHead } from "@unhead/vue";

const app = createApp(App);
const head = createHead();

components.forEach((component) => {
  app.component(component.name, component);
});

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(ElementPlus).use(store).use(router).use(head).mount("#app");
