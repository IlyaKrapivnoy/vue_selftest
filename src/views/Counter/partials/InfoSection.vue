<template>
  <div class="mt-6">
    <p
      v-for="(info, index) in props.infoData"
      :key="index"
      class="text-gray-400 font-bold"
    >
      {{ info.title }}
      <span class="text-gray-600">{{ info.data }}</span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  infoData: Array,
});
</script>
