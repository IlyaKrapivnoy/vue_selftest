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
      <book-list
        v-if="!isBooksLoading"
        :books="books"
        @removeBook="removeBook"
      />
      <my-spinner v-else />
    </div>
  </div>
</template>

<script>
import BookForm from "@/components/book/BookForm.vue";
import BookList from "@/components/book/BookList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import { fetchBooks } from "@/services/bookServices";
import MySpinner from "@/components/UI/MySpinner.vue";

export default {
  name: "BookshelfView",
  components: { MySpinner, MyDialog, BookList, BookForm },
  data() {
    return {
      books: [],
      dialogVisible: false,
      isBooksLoading: false,
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
      this.isBooksLoading = true;
      const booksData = await fetchBooks();
      if (booksData) {
        this.books = booksData.items;
        this.saveToLocalStorage();
        this.isBooksLoading = false;
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
