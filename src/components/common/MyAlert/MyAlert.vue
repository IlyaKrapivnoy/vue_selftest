<template>
  <div v-show="props.isAlert" :class="props.wrapperClass">
    <el-alert
      :title="props.title"
      :type="props.type"
      :description="props.description"
      :show-icon="props.showIcon"
      :closable="props.closable"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  isAlert: Boolean,
  wrapperClass: String,
  title: String,
  type: {
    validator: (value) =>
      ["success", "warning", "error", "info"].includes(value),
    default: "success",
  },
  description: String,
  showIcon: Boolean,
  closable: Boolean,
});
</script>
