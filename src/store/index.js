import { createStore } from "vuex";
import { counterModule } from "@/store/counterModule";
import { quotesModule } from "@/store/quotesModule";
import { bandNamesModule } from "@/store/bandNamesModule";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isAuth: false,
  },
  modules: {
    counter: counterModule,
    quotes: quotesModule,
    bandNames: bandNamesModule,
  },
  plugins: [createPersistedState()],
});
