<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>TODO PAGE</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col">
      <reusable-input
        label="Add new todo"
        placeholder="Enter your task..."
        inputId="todoInput"
        @update:inputValue="input = $event"
        class="mt-6"
      />

      <el-button
        native-type="submit"
        type="primary"
        class="self-end w-1/5 mt-3"
      >
        Add
      </el-button>
    </form>
  </main>
</template>

<script>
import { ref } from "vue";
import ReusableInput from "@/components/partials/ReusableInput.vue";

export default {
  components: { ReusableInput },
  setup() {
    const input = ref("");

    const handleSubmit = () => {
      console.log(input.value);
    };

    return {
      input,
      handleSubmit,
    };
  },
};
</script>
