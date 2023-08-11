<template>
  <div>
    <label :for="inputId" class="text-lg font-bold">{{ label }}</label>
    <el-input
      :placeholder="placeholder"
      v-model="internalValue"
      :id="inputId"
      clearable
    ></el-input>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    label: String,
    placeholder: String,
    inputId: String,
    inputValue: String,
  },
  emits: ["update:inputValue"],
  setup(props, { emit }) {
    const internalValue = ref(props.inputValue);

    watch(internalValue, (newValue) => {
      emit("update:inputValue", newValue);
    });

    return {
      internalValue,
    };
  },
};
</script>
