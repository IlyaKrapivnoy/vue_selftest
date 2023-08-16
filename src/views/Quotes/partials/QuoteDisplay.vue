<template>
  <el-card v-if="quote" class="box-card mt-6">
    <div class="flex flex-col">
      <div>
        <p class="italic">{{ quote.quote }}</p>
        <p>{{ quote.author }}</p>
      </div>
      <div class="flex self-end items-center">
        <el-button @click="$emit('increaseLikes')" type="success" plain round
          >+</el-button
        >
        <span class="px-3"> {{ quote.likes }} </span>
        <el-button @click="$emit('decreaseLikes')" type="success" plain round
          >-</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  quote: Object,
});
</script>
