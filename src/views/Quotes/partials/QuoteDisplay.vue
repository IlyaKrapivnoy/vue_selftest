<template>
  <el-card v-if="quote" class="box-card mt-6">
    <div>
      <p class="italic">{{ quote.quote }}</p>
      <p>{{ quote.author }}</p>
    </div>
    <div class="flex">
      <p>Likes: <span>-</span> {{ quote.likes }} <span>+</span></p>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    quote: Object,
  },
};
</script>
