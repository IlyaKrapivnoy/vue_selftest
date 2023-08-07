<template>
  <div class="bookshelf">
    <div class="container mx-auto px-4">
      <h1>Your Books</h1>
      <div class="flex flex-col">
        <my-input
          v-focus
          v-model="searchedQuery"
          placeholder="Search book by title..."
        />
        <button @click="showDialog" class="mt-6">Add Book</button>
      </div>
      <!--      form-->
      <my-dialog v-model:show="dialogVisible">
        <book-form
          formTitle="Add a new book"
          :titlePlaceholder="titlePlaceholder"
          :authorPlaceholder="authorPlaceholder"
          @form-submitted="createBook"
        />
      </my-dialog>
      <!--      list-->
      <book-list
        v-if="!isBooksLoading"
        :books="searchedBooks"
        @removeBook="removeBook"
      />
      <my-spinner v-else />
      <my-pagination
        v-if="!isBooksLoading && totalPages > 1"
        :page="page"
        :totalPages="totalPages"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import BookForm from "@/components/UI/MyForm.vue";
import BookList from "@/components/book/BookList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import { fetchBooks } from "@/services/bookServices";
import MySpinner from "@/components/UI/MySpinner.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyPagination from "@/components/UI/MyPagination.vue";

export default {
  name: "BookshelfView",
  components: {
    MyPagination,
    MyInput,
    MySpinner,
    MyDialog,
    BookList,
    BookForm,
  },
  data() {
    return {
      books: [],
      dialogVisible: false,
      titlePlaceholder: "Add title",
      authorPlaceholder: "Add author",
      isBooksLoading: false,
      searchedQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
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
      try {
        const data = localStorage.getItem("books");
        this.books = JSON.parse(data) || [];
      } catch (error) {
        console.warn("Error parsing data from localStorage:", error);
        this.books = [];
      }
    },

    showDialog() {
      this.dialogVisible = true;
    },
    changePage(changePage) {
      this.page = changePage;
      this.addBooks();
    },
    async addBooks() {
      this.isBooksLoading = true;
      try {
        const booksData = await fetchBooks(this.page, this.limit);
        if (booksData) {
          this.books = booksData.items;
          this.totalPages = Math.ceil(
            (booksData.totalItems = 100 / this.limit)
          );
          this.saveToLocalStorage();
        }
      } catch (error) {
        console.warn("Error fetching data:", error);
      } finally {
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
