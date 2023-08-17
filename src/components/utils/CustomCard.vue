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
          @click="button.click"
        >
          {{ button.name }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  cardTextBold: String,
  cardTextLight: String,
  buttons: Array,
});
</script>
