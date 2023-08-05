<template>
  <div class="container mx-auto px-4">
    <h1>Book: {{ bookTitle }}</h1>
    <p>Book description will be here...</p>

    <button @click="handleBackButton">Back</button>
  </div>
</template>

<script>
export default {
  name: "SingleBook",
  data() {
    return {
      bookTitle: "",
    };
  },
  created() {
    this.bookTitle = this.$route.params.title;
  },
  methods: {
    handleBackButton() {
      this.$router.push("/bookshelf");
    },
  },
};
</script>
