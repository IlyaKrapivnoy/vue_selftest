<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Counter Page</h1>
    <div>
      <p class="text-gray-400 font-bold">
        Increase / Decrease by: <span class="text-gray-600">{{ number }}</span>
      </p>
    </div>
    <div
      class="flex flex-col justify-center items-center h-[calc(100vh-300px)]"
    >
      <div class="text-[100px] font-bold text-gray-600">
        {{ counter }}
      </div>
      <div class="w-[200px] flex flex-col items-center">
        <div class="w-full flex">
          <el-button @click="decrease" type="success" plain class="w-1/2">
            -
          </el-button>
          <el-button @click="increase" type="success" plain class="w-1/2">
            +
          </el-button>
        </div>
        <el-button @click="reset" type="danger" plain class="w-full mt-4">
          reset
        </el-button>

        <div class="w-full mt-4">
          <el-input
            v-model.number="inputNumber"
            type="number"
            size="small"
            placeholder="Increase / decrease by..."
            class="w-full"
          />
          <el-button
            @click="applyChange"
            type="primary"
            plain
            class="w-full mt-2"
          >
            Apply
          </el-button>
        </div>
      </div>

      <div v-show="isAlert" class="alert">
        <el-alert
          title="warning alert"
          type="warning"
          description="Only positive numbers"
          show-icon
          :closable="false"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const counter = ref(100);
    let isAlert = ref(false);
    let number = ref(1);
    let inputNumber = ref(1);

    const decrease = () => {
      if (counter.value > 0) {
        counter.value -= number.value;
      } else {
        isAlert.value = true;
      }
    };

    const increase = () => {
      counter.value += number.value;
      isAlert.value = false;
    };

    const reset = () => {
      counter.value = 0;
      isAlert.value = false;
    };

    const applyChange = () => {
      if (!isNaN(inputNumber.value)) {
        number.value = Number(inputNumber.value);
      }
    };

    return {
      counter,
      isAlert,
      decrease,
      increase,
      reset,
      applyChange,
      inputNumber,
      number,
    };
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  width: 45%;
  bottom: 20%;
  right: 6%;
}
</style>
