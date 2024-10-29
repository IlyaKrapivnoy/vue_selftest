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
      <CounterSection :counter="counter" />
      <div class="w-[200px] flex flex-col items-center">
        <ButtonControllerSection
          :buttons="buttons"
          @reset="reset"
          @increase="increase"
          @decrease="decrease"
        />

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
      <MyAlert
        :isAlert="isAlert"
        :wrapperClass="'alert'"
        :title="'warning alert'"
        :type="'warning'"
        :description="'Only positive numbers that are larger than zero'"
        :showIcon="true"
        :closable="false"
      />
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { COUNTER_HEAD } from "@/data/head";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";
import InfoView from "@/views/Counter/partials/InfoSection.vue";
import ButtonControllerSection from "@/views/Counter/partials/ButtonControllerSection.vue";
import CounterSection from "@/views/Counter/partials/CounterSection.vue";
import MyAlert from "@/components/common/MyAlert/MyAlert.vue";

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

const buttons = [
  { label: "-", event: "decrease", type: "success" },
  { label: "+", event: "increase", type: "success" },
  { label: "reset", event: "reset", type: "danger" },
];

const decrease = () => store.dispatch("decrease");
const increase = () => store.dispatch("increase");
const reset = () => store.dispatch("reset");

const applyChange = () => {
  const newValue = Number(inputNumber.value);
  store.dispatch("applyChange", newValue);
};

const onInputChange = (value) => {
  store.dispatch("updateInputNumber", value);
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
