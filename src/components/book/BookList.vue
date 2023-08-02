<template>
  <div class="mt-10">
    <h2>Book List</h2>
    <book-item :book="book" v-for="book in books" :key="book.id" />
  </div>

  <div v-if="books.length === 0" class="text-center mt-5">
    There are no books.
  </div>
</template>

<script>
import BookItem from "@/components/book/BookItem.vue";

export default {
  components: { BookItem },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeBook(id) {
      this.$emit("remove-book", id);
    },
  },
  emits: ["remove-book"],
};
</script>
