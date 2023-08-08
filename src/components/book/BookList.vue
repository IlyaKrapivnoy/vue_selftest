<template>
  <div class="mt-10">
    <h2>Book List</h2>

    <transition-group name="book-list">
      <MyItem
        v-for="book in books"
        :key="book.id"
        :item="book"
        label1="Book Title"
        label2="Author"
        containerClass="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
        routePath="bookshelf"
        @removeItem="$emit('removeBook', book)"
      />
    </transition-group>
  </div>

  <div v-if="books.length === 0" class="text-center mt-5">
    There are no books.
  </div>
</template>

<script>
import MyItem from "@/components/UI/MyItem.vue";

export default {
  components: { MyItem },
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
