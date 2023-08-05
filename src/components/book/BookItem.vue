<template>
  <div
    class="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
  >
    <div>
      <p>
        <strong>Book Title:</strong>
        {{ book?.volumeInfo?.title || book?.title || "No title" }}
      </p>
      <p>
        <strong>Author:</strong>
        {{ allAuthors || book?.author || "Unknown Author" }}
      </p>
    </div>
    <div class="flex flex-col">
      <button @click="$emit('removeBook', book)">x</button>
      <button @click="handleOpenSingleBookPage">Open</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allAuthors() {
      return this.book?.volumeInfo?.authors?.join(", ") || "Unknown Author";
    },
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleOpenSingleBookPage() {
      this.$router.push(
        this.book?.title
          ? `/bookshelf/${this.book.title}`
          : `/bookshelf/${this.book?.volumeInfo?.title}`
      );
    },
  },
};
</script>
