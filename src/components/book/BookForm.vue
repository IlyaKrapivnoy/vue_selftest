<template>
  <div class="mt-10">
    <h2>Add a new book</h2>
    <form @submit.prevent class="flex flex-col w-full">
      <input placeholder="Add title" v-model="book.title" />
      <input placeholder="Add author" v-model="book.author" />
      <button class="mt-6" @click="createBook">Add</button>
    </form>
  </div>
</template>

<script>
export default {
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
};
</script>
