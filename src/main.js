import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./main.css";
import components from "./components";
import directives from "@/directives";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(ElementPlus).use(store).use(router).mount("#app");
