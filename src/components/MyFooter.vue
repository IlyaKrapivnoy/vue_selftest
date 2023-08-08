<template>
  <footer class="flex justify-center border-t-[1px]">
    <div class="my-8">&copy; By Ilya Krapivnoy {{ currentYear }}</div>
  </footer>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const currentYear = ref(new Date().getFullYear());
    return {
      currentYear,
    };
  },
};
</script>
