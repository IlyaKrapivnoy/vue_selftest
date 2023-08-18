export const counterModule = {
  state() {
    return {
      counter: 100,
      number: 1,
      operations: 0,
      inputNumber: 1,
      isAlert: false,
    };
  },
  mutations: {
    decrease(state) {
      if (state.counter > 0) {
        state.counter -= state.number;
        state.operations++;
      } else {
        state.isAlert = true;
      }
    },
    increase(state) {
      state.counter += state.number;
      state.operations++;
      state.isAlert = false;
    },
    reset(state) {
      state.counter = 0;
      state.isAlert = false;
    },
    applyChange(state, newVal) {
      if (!isNaN(newVal)) {
        const newNumber = Number(newVal);
        if (newNumber > 0) {
          state.number = newNumber;
          state.isAlert = false;
        } else {
          state.isAlert = true;
        }
      }
    },
  },
};
