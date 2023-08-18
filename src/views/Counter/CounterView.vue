<template>
  <HeadSetter
    :title="COUNTER_HEAD.title"
    :name="COUNTER_HEAD.name"
    :content="COUNTER_HEAD.content"
  />
  <main class="container mx-auto px-4 mt-20">
    <h1>Counter Page</h1>

    <InfoView :infoData="infoData" />

    <div
      class="flex flex-col justify-center items-center h-[calc(100vh-400px)]"
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
            @input="onInputChange"
            @keydown.enter="applyChange"
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
          description="Only positive numbers that are bigger than zero"
          show-icon
          :closable="false"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { COUNTER_HEAD } from "@/data/head";
import HeadSetter from "@/components/utils/HeadSetter.vue";
import InfoView from "@/views/Counter/partials/InfoSection.vue";

const store = useStore();
const counterModule = store.state.counter;

const counter = computed(() => counterModule.counter);
const number = computed(() => counterModule.number);
const operations = computed(() => counterModule.operations);
const isAlert = computed(() => counterModule.isAlert);
const inputNumber = computed(() => counterModule.inputNumber);

const infoData = [
  {
    title: "Increase / Decrease by:",
    data: number,
  },
  {
    title: "Total amount of operations by browser session:",
    data: operations,
  },
];

const decrease = () => store.commit("decrease");
const increase = () => store.commit("increase");
const reset = () => store.commit("reset");

const applyChange = () => {
  const newValue = Number(inputNumber.value);
  store.commit("applyChange", newValue);
};

const onInputChange = (value) => {
  counterModule.inputNumber = value.replace(/\D/g, "");
};

onMounted(() => {
  counterModule.operations = Number(sessionStorage.getItem("operations")) || 0;
});

const saveOperationsToSessionStorage = () => {
  sessionStorage.setItem("operations", counterModule.operations.toString());
};

watch(operations, () => {
  saveOperationsToSessionStorage();
});
</script>

<style scoped>
.alert {
  position: fixed;
  width: 35%;
  bottom: 20%;
  right: 6%;
}
</style>
