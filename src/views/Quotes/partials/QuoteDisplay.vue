<template>
  <div v-if="quote">
    <p>{{ quote }}</p>
  </div>
</template>

<script>
export default {
  props: {
    quote: String,
  },
};
</script>
