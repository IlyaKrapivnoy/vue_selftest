<template>
  <el-card v-if="quote" class="box-card mt-6">
    <div class="flex flex-col">
      <div>
        <p class="italic">{{ quote.quote }}</p>
        <p>{{ quote.author }}</p>
      </div>
      <div class="flex self-end items-center">
        <el-button @click="incrementLikes" type="success" plain round
          >+</el-button
        >
        <span class="px-3">
          {{ quote.likes }}
        </span>
        <el-button @click="decrementLikes" type="success" plain round
          >-</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script setup>
const decrementLikes = () => {
  console.log("decrementLikes", --props.quote.likes);
};

const incrementLikes = () => {
  console.log("incrementLikes", ++props.quote.likes);
};

const props = defineProps({
  quote: Object,
});
</script>
