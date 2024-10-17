<template>
  <div :class="['flex items-center justify-center my-10', wrapperClass]">
    <div class="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500" />
  </div>
</template>

<script>
export default {
  name: "MySpinner",
  props: {
    wrapperClass: {
      type: String,
      default: "",
    },
  },
};
</script>
