<template>
  <div class="flex justify-center my-10">
    <div
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      class="page-item"
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
.page-item {
  border: 1px solid black;
  padding: 2px 8px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 3px;
}

.page-item.current-page {
  border: 2px solid teal;
}
</style>
