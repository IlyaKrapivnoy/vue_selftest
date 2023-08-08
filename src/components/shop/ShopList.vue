<template>
  <div class="mt-10">
    <h2>Shop List</h2>
    <transition-group name="shop-list">
      <MyItem
        v-for="shop in shops"
        :key="shop.id"
        :item="shop"
        label1="Shop Name"
        label2="Location"
        containerClass="border-2 border-green-500 p-2 px-4 mt-5 flex justify-between items-center"
        routePath="shoplist"
        @removeItem="$emit('removeShop', shop)"
      />
    </transition-group>
  </div>

  <div class="text-center mt-5" v-if="shops.length === 0">no items</div>
</template>

<script>
import MyItem from "@/components/UI/MyItem.vue";

export default {
  components: { MyItem },
  props: {
    shops: {
      type: Array,
      required: true,
    },
  },
  methods: {},
  emits: ["removeShop"],
};
</script>

<style scoped>
.shop-list-item {
  display: inline-block;
  margin-right: 10px;
}

.shop-list-enter-active,
.shop-list-leave-active {
  transition: all 0.4s ease;
}
.shop-list-enter-from,
.shop-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
