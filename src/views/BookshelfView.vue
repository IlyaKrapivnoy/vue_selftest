<template>
  <div class="bookshelf">
    <div class="container mx-auto px-4">
      <h1>Your Books</h1>
      <div class="flex flex-col">
        <my-input
          v-model="searchedQuery"
          placeholder="Search book by title..."
        />
        <button @click="showDialog" class="mt-6">Add Book</button>
      </div>
      <!--      form-->
      <my-dialog v-model:show="dialogVisible">
        <book-form @create="createBook" />
      </my-dialog>
      <!--      list-->
      <book-list
        v-if="!isBooksLoading"
        :books="searchedBooks"
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
import MyInput from "@/components/UI/MyInput.vue";

export default {
  name: "BookshelfView",
  components: { MyInput, MySpinner, MyDialog, BookList, BookForm },
  data() {
    return {
      books: [],
      dialogVisible: false,
      isBooksLoading: false,
      searchedQuery: "",
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
  computed: {
    searchedBooks() {
      if (!this.searchedQuery) {
        return this.books;
      }
      const query = this.searchedQuery.toLowerCase().trim();
      return this.books.filter((book) => {
        const title =
          (book.title || book.volumeInfo.title)?.toLowerCase() || "";
        return title.includes(query);
      });
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
