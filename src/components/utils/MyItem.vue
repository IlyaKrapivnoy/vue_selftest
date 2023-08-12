<template>
  <el-card class="box-card my-5">
    <div class="flex justify-between items-center">
      <div class="pr-10">
        <p>
          <strong>{{ label1 }}:</strong>
          {{ displayValue1 }}
        </p>
        <p>
          <strong>{{ label2 }}:</strong>
          {{ displayValue2 }}
        </p>
      </div>
      <div class="flex">
        <el-button plain class="w-[70px]" @click="handleOpenPage"
          >Open</el-button
        >
        <el-button plain type="danger" class="w-[30px]" @click="removeItem"
          >x</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
    label1: {
      type: String,
      required: true,
    },
    label2: {
      type: String,
      required: true,
    },
    containerClass: {
      type: String,
      required: true,
    },
    routePath: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit, router }) {
    const displayValue1 = computed(() => props.item?.body || "No title");

    const displayValue2 = computed(() => props.item?.title || "No post text");

    const removeItem = () => {
      emit("removeItem", props.item);
    };

    const handleOpenPage = () => {
      const itemTitle = props.item?.body;
      if (itemTitle) {
        router.push(`/${props.routePath}/${itemTitle}`);
      }
    };

    return {
      displayValue1,
      displayValue2,
      removeItem,
      handleOpenPage,
    };
  },
});
</script>
