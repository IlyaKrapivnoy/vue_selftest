<template>
  <section class="finish">
    <h2>You have finished the quiz!</h2>
    <p>
      Your score is {{ props.currentScore }}/{{ props.totalQuestionsCount }}
    </p>

    <div class="mt-4">
      <p :class="getResultClass">{{ getResultMessage }}</p>
    </div>

    <el-button type="warning" plain :onClick="startOver" class="mt-6">
      Start Over
    </el-button>
  </section>
</template>

<script setup>
import { computed, defineEmits } from "vue";

const getResultMessage = computed(() => {
  if (props.currentScore > 3) return "AWESOME RESULT!";
  if (props.currentScore >= 2 && props.currentScore <= 3) return "NOT BAD";
  return "YOU CAN DO BETTER!";
});

const getResultClass = computed(() => {
  if (props.currentScore > 3) return "text-green-500 font-bold";
  if (props.currentScore >= 2 && props.currentScore <= 3)
    return "text-yellow-500 font-bold";
  return "text-red-500 font-bold";
});

const emit = defineEmits(["onStartOver"]);

const startOver = () => {
  emit("onStartOver");
};

const props = defineProps({
  currentScore: Number,
  totalQuestionsCount: Number,
});
</script>
