<template>
  <div class="flex justify-between items-center h-[50px] mt-3 text-indigo-300">
    <span
      class="text-green-600 font-bold uppercase mr-10 pl-4 border-green-600 border-l-4"
      >{{ props.getCurrentQuestion.question }}</span
    >
    <div class="w-[240px] flex justify-between">
      <p>
        <span class="font-bold">Score:</span> {{ props.currentScore }}/{{
          props.totalQuestionsCount
        }}
      </p>
      <span class="border-r-[1px] border-dotted border-black"></span>
      <p>
        <span class="font-bold">Question:</span>
        {{ props.getCurrentQuestion.index + 1 }}/{{ props.totalQuestionsCount }}
      </p>
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
