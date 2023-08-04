<template>
  <div class="mt-10">
    <h2>Book List</h2>

    <transition-group name="book-list">
      <book-item
        :book="book"
        v-for="book in books"
        :key="book.id"
        @removeBook="$emit('removeBook', book)"
      />
    </transition-group>
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
  methods: {},
  emits: ["removeBook"],
};
</script>

<style scoped>
.book-list-item {
  display: inline-block;
  margin-right: 10px;
}

.book-list-enter-active,
.book-list-leave-active {
  transition: all 0.4s ease;
}
.book-list-enter-from,
.book-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
