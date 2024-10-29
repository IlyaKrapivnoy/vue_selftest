<template>
  <el-card v-if="props.quote" class="box-card mt-6">
    <div class="flex flex-col">
      <div>
        <p class="italic">{{ props.quote.quote }}</p>
        <p>{{ props.quote.author }}</p>
      </div>
      <div class="flex self-end items-center">
        <el-button
          :plain="!store.state.quotes.likeStatus"
          @click="$emit('increaseLikes')"
          type="success"
          round
        >
          +
        </el-button>
        <span class="px-3">{{ props.quote.likes }}</span>
        <el-button
          :plain="!store.state.quotes.dislikeStatus"
          @click="$emit('decreaseLikes')"
          type="success"
          round
        >
          -
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { useStore } from "vuex";

const props = defineProps({
  quote: Object,
});
/* eslint-disable */
const emits = defineEmits(["increaseLikes", "decreaseLikes"]);

const store = useStore();
</script>
