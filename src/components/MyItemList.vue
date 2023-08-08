<template>
  <div class="mt-14">
    <h2>{{ listTitle }}</h2>

    <transition-group :name="transitionName">
      <my-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        :label1="label1"
        :label2="label2"
        :containerClass="containerClass"
        :routePath="routePath"
        @removeItem="emitRemoveItem(item)"
      />
    </transition-group>

    <div v-if="items.length === 0" class="text-center mt-5">
      {{ noItemsMessage }}
    </div>
  </div>
</template>

<script>
import MyItem from "@/components/MyItem.vue";

export default {
  components: { MyItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    listTitle: String,
    label1: String,
    label2: String,
    containerClass: String,
    routePath: String,
    noItemsMessage: String,
  },
  emits: ["removeItem"],
  computed: {
    transitionName() {
      return `${this.listTitle.toLowerCase()}-list`;
    },
  },
  methods: {
    emitRemoveItem(item) {
      this.$emit("removeItem", item);
    },
  },
};
</script>
