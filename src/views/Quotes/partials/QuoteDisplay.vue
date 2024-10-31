<template>
  <el-card v-if="props.quote" class="box-card mt-6">
    <div class="flex flex-col">
      <div>
        <p class="italic">{{ props.quote.quote }}</p>
        <p>{{ props.quote.author }}</p>
      </div>
      <div
        @click="$emit('increaseLikes')"
        class="flex self-end items-center cursor-pointer"
      >
        <SvgLikeIcon
          :class="{ liked: store.state.quotes.likeStatus ? 'liked' : '' }"
        />
        <span class="px-3">{{ props.quote.likes }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { useStore } from "vuex";
import SvgLikeIcon from "@/svg/SvgLikeIcon.vue";

const props = defineProps({
  quote: Object,
});

/* eslint-disable */
const emits = defineEmits(["increaseLikes", "decreaseLikes"]);
const store = useStore();
</script>

<style scoped>
.liked {
  fill: red;
}
</style>
