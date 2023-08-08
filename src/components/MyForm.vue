<template>
  <div>
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent class="flex flex-col w-full">
      <div v-for="(field, index) in formFields" :key="index">
        <my-input
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
        />
      </div>
      <button class="mt-6" @click="submitForm">Add</button>
    </form>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput.vue";
import { reactive, defineComponent } from "vue";

export default defineComponent({
  components: { MyInput },
  props: {
    formTitle: {
      type: String,
      required: true,
    },
    formFields: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = reactive({});

    const submitForm = () => {
      const formValues = { ...formData };
      emit("form-submitted", formValues);
      resetForm();
    };

    const resetForm = () => {
      for (const field of props.formFields) {
        formData[field.name] = "";
      }
    };

    return {
      formData,
      submitForm,
    };
  },
});
</script>
