<template>
  <el-card class="box-card my-3">
    <div class="flex justify-between items-center">
      <p class="font-bold">
        {{ props.cardTextBold }}
        <span class="font-extralight text-indigo-600">{{
          props.cardTextLight
        }}</span>
      </p>
      <div>
        <el-button
          v-for="(button, index) in props.buttons"
          :key="index"
          :type="button.type"
          plain
          @click="button.click"
        >
          {{ button.name }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  cardTextBold: String,
  cardTextLight: String,
  buttons: Array,
});
</script>
