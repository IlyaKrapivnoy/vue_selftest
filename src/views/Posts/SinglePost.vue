<template>
  <div class="container mx-auto px-4">
    <h1>Post: {{ postTitle }}</h1>
    <p>Post text will be here...</p>

    <el-button plain @click="handleBackButton">Back</el-button>
  </div>
</template>

<script>
export default {
  name: "SinglePost",
  data() {
    return {
      postTitle: "",
    };
  },
  created() {
    this.postTitle = this.$route.params.title;
  },
  methods: {
    handleBackButton() {
      this.$router.push("/posts");
    },
  },
};
</script>
