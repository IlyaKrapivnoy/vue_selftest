<template>
  <div class="bookshelf">
    <div class="container mx-auto px-4">
      <h1>Your Books</h1>
      <div class="mt-10">
        <h2>Add a new book</h2>
        <form @submit.prevent class="flex flex-col w-full">
          <input
            placeholder="Add title"
            v-bind:value="title"
            @input="title = $event.target.value"
          />
          <input
            placeholder="Add author"
            v-bind:value="author"
            @input="author = $event.target.value"
          />
          <button @click="handleSubmit">Add</button>
        </form>
      </div>

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
      author: "",
      title: "",
    };
  },
  methods: {
    handleSubmit() {
      const newBook = {
        id: Date.now(),
        title: this.title,
        author: this.author,
      };
      this.books.push(newBook);
      this.author = "";
      this.title = "";
    },
  },
};
</script>
