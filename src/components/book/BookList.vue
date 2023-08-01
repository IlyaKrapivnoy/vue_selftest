<template>
  <div class="mt-10">
    <div
      class="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
      v-for="book in books"
      :key="book.id"
    >
      <div>
        <p><strong>Book Title:</strong> {{ book.title }}</p>
        <p><strong>Author:</strong> {{ book.author }}</p>
      </div>

      <button @click="removeBook(book.id)">x</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
};
</script>
