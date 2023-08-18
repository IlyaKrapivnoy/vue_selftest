<template>
  <div class="text-[100px] font-bold text-gray-600">
    {{ props.counter }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  counter: Number,
});
</script>
