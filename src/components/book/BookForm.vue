<template>
  <div class="mt-10">
    <h2>Add a new book</h2>
    <form @submit.prevent class="flex flex-col w-full">
      <my-input placeholder="Add title" v-model="book.title" />
      <my-input placeholder="Add author" v-model="book.author" />
      <button class="mt-6" @click="createBook">Add</button>
    </form>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: { MyInput },
  data() {
    return {
      book: {
        title: "",
        author: "",
      },
    };
  },
  methods: {
    createBook() {
      this.book.id = Date.now();
      this.$emit("create", this.book);
      this.book = {
        title: "",
        author: "",
      };
    },
  },
  emits: ["create"],
};
</script>
