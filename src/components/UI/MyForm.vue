<template>
  <h2>{{ formTitle }}</h2>
  <form @submit.prevent class="flex flex-col w-full">
    <my-input
      :placeholder="titlePlaceholder"
      v-focus
      v-model="formData.title"
    />
    <my-input :placeholder="authorPlaceholder" v-model="formData.author" />
    <button class="mt-6" @click="submitForm">Add</button>
  </form>
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
    titlePlaceholder: {
      type: String,
      required: true,
    },
    authorPlaceholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        title: "",
        author: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.formData.id = Date.now();
      this.$emit("form-submitted", this.formData);
      this.formData = {
        title: "",
        author: "",
      };
    },
  },
  emits: ["form-submitted"],
};
</script>
