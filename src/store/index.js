import { createStore } from "vuex";
import { counterModule } from "@/store/counterModule";

export default createStore({
  state: {
    isAuth: false,
  },
  modules: {
    counter: counterModule,
  },
});
