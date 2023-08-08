<template>
  <el-input v-model="input" clearable @input="updateInput" class="mt-3" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  data() {
    return {
      input: this.modelValue,
    };
  },
  methods: {
    updateInput() {
      this.$emit("update:modelValue", this.input);
    },
  },
};
</script>
