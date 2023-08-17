<template>
  <el-card class="box-card my-3">
    <div class="flex justify-between items-center">
      <p class="font-bold">
        {{ props.cardTextBold }}
        <span class="font-extralight text-indigo-600">{{
          props.cardTextLight
        }}</span>
      </p>
      <el-button @click="props.buttonClick">
        {{ props.buttonText }}
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  cardTextBold: String,
  cardTextLight: String,
  buttonText: String,
  buttonClick: Function,
});
</script>
