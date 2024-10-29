export const counterModule = {
  state: () => ({
    counter: 100,
    number: 1,
    operations: 0,
    inputNumber: 1,
    isAlert: false,
  }),
  mutations: {
    decrement(state) {
      if (state.counter > 0) {
        state.counter -= state.number;
        state.operations++;
      }
    },
    increment(state) {
      state.counter += state.number;
      state.operations++;
      state.isAlert = false;
    },
    resetCounter(state) {
      state.counter = 0;
      state.operations = 0;
      state.number = 1;
      state.inputNumber = 1;
      state.isAlert = false;
    },
    setNumber(state, newVal) {
      if (!isNaN(newVal) && newVal > 0) {
        state.number = newVal;
        state.isAlert = false;
      } else {
        state.isAlert = true;
      }
    },
    setInputNumber(state, newVal) {
      if (!isNaN(newVal)) {
        state.inputNumber = newVal;
      }
    },
    showAlert(state) {
      state.isAlert = true;
    },
    hideAlert(state) {
      state.isAlert = false;
    },
  },
  actions: {
    async triggerAlert({ commit }) {
      commit("showAlert");

      setTimeout(() => {
        commit("hideAlert");
      }, 3000);
    },
    decrease({ commit, dispatch, state }) {
      commit("decrement");
      if (state.counter <= 0) {
        dispatch("triggerAlert");
      }
    },
    increase({ commit }) {
      commit("increment");
    },
    reset({ commit }) {
      commit("resetCounter");
    },
    applyChange({ commit, dispatch }, newVal) {
      commit("setNumber", newVal);

      if (newVal <= 0) {
        dispatch("triggerAlert");
      }
    },
    updateInputNumber({ commit }, newVal) {
      commit("setInputNumber", newVal);
    },
  },
};
