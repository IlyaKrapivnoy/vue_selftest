<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Your Posts</h1>
    <div class="flex flex-col">
      <my-input
        v-focus
        v-model="searchedQuery"
        placeholder="Search post by title..."
      />
      <el-button plain class="mt-6" @click="showDialog">Add Post</el-button>
    </div>
    <!--      form-->
    <my-dialog v-model:show="dialogVisible">
      <my-form
        :formTitle="formTitle"
        :formFields="postFormFields"
        @form-submitted="createPost"
      />
    </my-dialog>
    <!--      list-->
    <my-item-list
      v-if="!isPostsLoading"
      :items="searchedPosts"
      listTitle="Post List"
      label1="Post Title"
      label2="Author"
      containerClass="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
      routePath="posts"
      noItemsMessage="There are no posts."
      @removeItem="removePost"
    />
    <my-spinner v-else />
    <my-pagination
      v-if="!isPostsLoading && totalPages > 1"
      :page="page"
      :totalPages="totalPages"
      @page-change="changePage"
    />
  </main>
</template>

<script>
import MyDialog from "@/components/utils/MyDialog.vue";
import MySpinner from "@/components/common/MySpinner.vue";
import MyInput from "@/components/utils/MyInput.vue";
import MyPagination from "@/components/common/MyPagination.vue";
import MyForm from "@/components/utils/MyForm.vue";
import MyItemList from "@/components/utils/MyItemList.vue";
import { fetchPosts } from "@/services/bookServices";

export default {
  name: "MyPosts",
  components: {
    MyItemList,
    MyForm,
    MyPagination,
    MyInput,
    MySpinner,
    MyDialog,
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      postFormFields: [
        { name: "title", placeholder: "Add title", useTextarea: false },
        { name: "post text", placeholder: "Add post text", useTextarea: true },
      ],
      isPostsLoading: false,
      searchedQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  methods: {
    createPost(post) {
      this.post.push(post);
      this.dialogVisible = false;
      this.saveToLocalStorage();
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    loadFromLocalStorage() {
      try {
        const data = localStorage.getItem("posts");
        this.posts = JSON.parse(data) || [];
      } catch (error) {
        console.warn("Error parsing data from localStorage:", error);
        this.posts = [];
      }
    },

    showDialog() {
      this.dialogVisible = true;
    },
    changePage(changePage) {
      this.page = changePage;
      this.addPosts();
    },
    async addPosts() {
      this.isPostsLoading = true;
      try {
        const response = await fetchPosts(this.page, this.limit);

        if (response) {
          this.posts = response.data;
          const totalCountHeader = response.headers["x-total-count"];
          this.totalPages = Math.ceil(totalCountHeader / this.limit);
          this.saveToLocalStorage();
        }
      } catch (error) {
        console.warn("Error fetching data:", error);
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  computed: {
    searchedPosts() {
      if (!this.searchedQuery) {
        return this.posts;
      }
      const query = this.searchedQuery.toLowerCase().trim();
      return this.posts.filter((post) => {
        const title = post.title?.toLowerCase() || "";
        return title.includes(query);
      });
    },
  },
  created() {
    this.loadFromLocalStorage();
  },
  mounted() {
    this.addPosts();
  },
  emits: ["removePost"],
};
</script>
