<template>
  <div
    class="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
  >
    <div>
      <p><strong>Book Title:</strong> {{ book.title }}</p>
      <p><strong>Author:</strong> {{ book.author }}</p>
    </div>

    <button @click="$emit('removeBook', book)">x</button>
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
};
</script>
