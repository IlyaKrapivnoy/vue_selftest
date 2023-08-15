<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Counter Page</h1>
    <div
      class="flex flex-col justify-center items-center h-[calc(100vh-300px)]"
    >
      <div class="text-[100px] font-bold text-orange-500">
        {{ counter }}
      </div>
      <div>
        <el-button @click="decrease" type="success" plain>-</el-button>
        <el-button @click="increase" type="success" plain>+</el-button>
        <el-button @click="reset" type="success" plain>reset</el-button>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const counter = ref(100);

    const decrease = () => counter.value--;
    const increase = () => counter.value++;
    const reset = () => (counter.value = 0);

    return { counter, decrease, increase, reset };
  },
};
</script>
