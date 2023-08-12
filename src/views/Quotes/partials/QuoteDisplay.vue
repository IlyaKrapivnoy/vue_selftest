<template>
  <el-card v-if="quote" class="box-card mt-6">
    <p class="italic">{{ quote.quote }}</p>
    <p>{{ quote.author }}</p>
  </el-card>
</template>

<script>
export default {
  props: {
    quote: String,
  },
};
</script>
