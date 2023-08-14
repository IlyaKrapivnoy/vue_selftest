<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Quiz page</h1>
  </main>
</template>

<script>
import { ref, computed } from "vue";
import quizQuestions from "@/data/quiz";

const questions = ref(quizQuestions);
const quizCompleted = ref(false);
const currentQuestion = ref(0);
const score = computed(() => {
  let value = 0;
  questions.value.map((q) => {
    if ((q.selected = q.answer)) {
      value++;
    }
  });
  return value;
});
</script>
