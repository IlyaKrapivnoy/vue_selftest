<template>
  <div
    class="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
  >
    <div>
      <p>
        <strong>Book Title:</strong>
        {{ displayBookTitle }}
      </p>
      <p>
        <strong>Author:</strong>
        {{ allAuthors }}
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
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  computed: {
    displayBookTitle() {
      return this.book?.volumeInfo?.title || this.book?.title || "No title";
    },
    allAuthors() {
      return (
        this.book?.volumeInfo?.authors?.join(", ") ||
        this.book?.author ||
        "Unknown Author"
      );
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
