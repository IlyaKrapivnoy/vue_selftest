<template>
  <el-card v-if="props.quote" class="box-card mt-6">
    <div class="flex flex-col">
      <div>
        <p class="italic">{{ props.quote.quote }}</p>
        <p>{{ props.quote.author }}</p>
      </div>
      <div
        @click="$emit('increaseLikes')"
        class="flex self-end items-center cursor-pointer like-status"
        :class="{ liked: store.state.quotes.likeStatus }"
      >
        <SvgLikeIcon />
        <span class="px-3 w-[40px]">{{ props.quote.likes }}</span>
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
.like-status {
  transition: opacity 0.3s ease;
}
.liked {
  opacity: 0.5;
}
.like-status:not(.liked) {
  opacity: 1;
}
</style>
