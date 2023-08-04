<template>
  <div class="bookshelf">
    <div class="container mx-auto px-4">
      <h1>Your Books</h1>
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
      books: [],
      dialogVisible: false,
    };
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
      this.books = JSON.parse(localStorage.getItem("books") || "[]");
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async addBooks() {
      const booksData = await fetchBooks();
      if (booksData) {
        this.books = booksData.items;
        this.saveToLocalStorage();
      }
    },
  },
  created() {
    this.loadFromLocalStorage();
  },
  mounted() {
    this.addBooks();
  },
  emits: ["removeBook"],
};
</script>
