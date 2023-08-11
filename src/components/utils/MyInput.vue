<template>
  <div>
    <el-input
      v-if="!useTextarea"
      v-model="input"
      clearable
      size="small"
      @input="updateInput"
      class="mt-3"
    />
    <el-textarea
      v-else
      v-model="input"
      size="small"
      @input="updateInput"
      class="mt-3"
    />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
    useTextarea: Boolean,
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
