<template>
  <div class="flex justify-between text-indigo-300">
    <span>{{ props.getCurrentQuestion.question }}</span>
    <div class="w-[240px] flex justify-between">
      <span
        >Score {{ props.currentScore }}/{{ props.totalQuestionsCount }}</span
      >
      <span class="border-r-[1px] border-black"></span>
      <span
        >Question {{ props.totalQuestionsCount }}/{{
          props.getCurrentQuestion.index + 1
        }}</span
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  getCurrentQuestion: Object,
  currentQuestion: Number,
  totalQuestionsCount: Number,
  currentScore: Number,
});
</script>
