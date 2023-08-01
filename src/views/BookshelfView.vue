<template>
  <div class="bookshelf">
    <div class="container mx-auto px-4">
      <h1>Your Books</h1>
      <!--      form-->
      <book-form @create="createBook" />
      <!--      list-->
      <book-list :books="books" @remove-book="removeBook" />

      <div v-if="books.length === 0" class="text-center mt-5">
        There are no books.
      </div>
    </div>
  </div>
</template>

<script>
import BookForm from "@/components/book/BookForm.vue";
import BookList from "@/components/book/BookList.vue";

export default {
  name: "BookshelfView",
  components: { BookList, BookForm },
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
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    createBook(book) {
      this.books.push(book);
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
