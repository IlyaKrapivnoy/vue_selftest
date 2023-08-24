<template>
  <div class="container mx-auto">
    <footer class="flex justify-center border-t-[1px]">
      <div class="my-8">&copy; By Ilya Krapivnoy {{ currentYear }}</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>
