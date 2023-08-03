<template>
  <div
    class="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
  >
    <div>
      <p><strong>Book Title:</strong> {{ book?.volumeInfo?.title }}</p>
      <p><strong>Author:</strong> {{ allAuthors }}</p>
    </div>

    <button @click="$emit('removeBook', book)">x</button>
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
};
</script>
