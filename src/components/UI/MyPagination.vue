<template>
  <div class="flex justify-center my-10">
    <div
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      class="border border-black px-4 py-2 rounded-lg cursor-pointer mx-1"
      :class="{ 'current-page': page === pageNumber }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("page-change", pageNumber);
    },
  },
};
</script>

<style>
.current-page {
  border: 2px solid teal;
}
</style>
