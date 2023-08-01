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
          <button class="mt-6" @click="handleSubmit">Add</button>
        </form>
      </div>

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

      <div v-if="books.length === 0" class="text-center mt-5">
        There are no books.
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
      filteredArray: [],
    };
  },
  created() {
    this.loadFromLocalStorage();
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
      this.saveToLocalStorage();
    },
    removeBook(id) {
      this.books = this.books.filter((item) => item.id !== id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("books", JSON.stringify(this.books));
    },
    loadFromLocalStorage() {
      const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
      this.books = storedBooks;
    },
  },
};
</script>
