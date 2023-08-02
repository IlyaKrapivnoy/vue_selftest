<template>
  <div class="mt-10">
    <h2>Shop List</h2>
    <shop-item :shop="shop" v-for="shop in shops" :key="shop.id" />
  </div>

  <div class="text-center mt-5" v-if="shops.length === 0">no items</div>
</template>

<script>
import ShopItem from "@/components/shop/ShopItem.vue";

export default {
  components: { ShopItem },
  props: {
    shops: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeShop(id) {
      this.$emit("remove-shop", id);
    },
  },
  emits: ["remove-shop"],
};
</script>
