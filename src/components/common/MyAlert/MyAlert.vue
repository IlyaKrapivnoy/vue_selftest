<template>
  <div v-show="props.isAlert" :class="props.wrapperClass">
    <el-alert
      :title="props.title ?? ''"
      :type="props.type"
      :description="props.description ?? ''"
      :show-icon="props.showIcon"
      :closable="props.closable"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  isAlert: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    validator: (value) =>
      ["success", "warning", "error", "info"].includes(value),
    default: "success",
  },
  description: {
    type: String,
    default: "",
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  closable: {
    type: Boolean,
    default: true,
  },
});
</script>
