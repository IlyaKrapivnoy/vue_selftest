import { createStore } from "vuex";
import { counterModule } from "@/store/counterModule";
import { quotesModule } from "@/store/quotesModule";
import { bandNamesModule } from "@/store/bandNamesModule";

export default createStore({
  state: {
    isAuth: false,
  },
  modules: {
    counter: counterModule,
    quotes: quotesModule,
    bandNames: bandNamesModule,
  },
});
