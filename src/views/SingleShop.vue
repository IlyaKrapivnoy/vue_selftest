<template>
  <div class="container mx-auto px-4">
    <h1>Shop: {{ shopTitle }}</h1>
    <p>Shop description will be here...</p>

    <button @click="handleBackButton">Back</button>
  </div>
</template>

<script>
export default {
  name: "SingleShop",
  data() {
    return {
      shopTitle: "",
    };
  },
  created() {
    this.shopTitle = this.$route.params.title;
  },
  methods: {
    handleBackButton() {
      this.$router.push("/shoplist");
    },
  },
};
</script>
