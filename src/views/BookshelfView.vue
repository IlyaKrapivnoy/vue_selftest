<template>
  <div class="bookshelf">
    <div class="container mx-auto px-4">
      <h1>Your Books</h1>
      <button @click="addBooks">Fetch Books</button>
      <button @click="showDialog" class="mt-6">Add Book</button>
      <!--      form-->
      <my-dialog v-model:show="dialogVisible">
        <book-form @create="createBook" />
      </my-dialog>
      <!--      list-->
      <book-list :books="books" @removeBook="removeBook" />
    </div>
  </div>
</template>

<script>
import BookForm from "@/components/book/BookForm.vue";
import BookList from "@/components/book/BookList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import { fetchBooks } from "@/services/bookServices";

export default {
  name: "BookshelfView",
  components: { MyDialog, BookList, BookForm },
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
      dialogVisible: false,
    };
  },
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    createBook(book) {
      this.books.push(book);
      this.dialogVisible = false;
      this.saveToLocalStorage();
    },
    removeBook(book) {
      this.books = this.books.filter((item) => item.id !== book.id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("books", JSON.stringify(this.books));
    },
    loadFromLocalStorage() {
      const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
      this.books = storedBooks;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async addBooks() {
      const booksData = await fetchBooks();
      if (booksData) {
        this.books = booksData.items;
      }
    },
  },
  emits: ["removeBook"],
};
</script>
