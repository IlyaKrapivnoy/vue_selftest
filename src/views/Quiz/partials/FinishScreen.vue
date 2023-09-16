<template>
  <section class="finish">
    <h2>You have finished the quiz!</h2>
    <p>Your score is {{ score }}/{{ totalQuestions }}</p>

    <div class="mt-4">
      <p :class="getResultClass">{{ getResultMessage }}</p>
    </div>

    <el-button type="warning" plain :onClick="startOver" class="mt-6">
      Start Over
    </el-button>
  </section>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";

const score = ref(0);
const totalQuestions = ref(0);

const getResultMessage = computed(() => {
  if (score.value > 3) return "AWESOME RESULT!";
  if (score.value >= 2 && score.value <= 3) return "NOT BAD";
  return "YOU CAN DO BETTER!";
});

const getResultClass = computed(() => {
  if (score.value > 3) return "text-green-500 font-bold";
  if (score.value >= 2 && score.value <= 3) return "text-yellow-500 font-bold";
  return "text-red-500 font-bold";
});

const emit = defineEmits(["onStartOver"]);

const startOver = () => {
  emit("onStartOver");
};
</script>
