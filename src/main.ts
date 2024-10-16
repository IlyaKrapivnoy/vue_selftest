import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./main.css";
import components from "./components/common";
import directives from "./directives";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createHead } from "@unhead/vue";
import { VueComponent, VueDirective } from "@/types";

const app = createApp(App);
const head = createHead();

(components as VueComponent[]).forEach((component) => {
  app.component(component.name, component);
});

(directives as VueDirective[]).forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(ElementPlus).use(store).use(router).use(head).mount("#app");
