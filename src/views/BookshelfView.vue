<template>
  <div class="bookshelf">
    <div class="container mx-auto px-4">
      <h1>Add Book</h1>
      <div class="mt-10">
        <div
          class="border-2 border-orange-500 p-2 px-4 mt-5"
          v-for="book in books"
          :key="book.id"
        >
          <p><strong>Book Title:</strong> {{ book.title }}</p>
          <p><strong>Author:</strong> {{ book.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookshelfView",
  data() {
    return {
      books: [
        { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
        { id: 2, title: "Clean Code", author: "Robert C. Martin" },
        {
          id: 3,
          title: "Introduction to Algorithms",
          author: "Thomas H. Cormen",
        },
      ],
    };
  },
};
</script>
