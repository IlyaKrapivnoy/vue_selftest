<template>
  <div class="w-full flex">
    <el-button
      v-for="(button, index) in props.buttons"
      :key="index"
      @click="$emit(button.event)"
      :type="button.type"
      plain
      class="w-1/3"
    >
      {{ button.label }}
    </el-button>
  </div>
</template>

<script setup>
const props = defineProps({
  buttons: Array,
});
</script>
