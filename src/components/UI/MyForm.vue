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
import MyInput from "@/components/UI/MyInput.vue";

export default {
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
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    submitForm() {
      const formValues = { ...this.formData };
      this.$emit("form-submitted", formValues);
      this.resetForm();
    },
    resetForm() {
      this.formData = {};
    },
  },
};
</script>
