<template>
  <div class="text-center mt-5" v-if="shops.length === 0">no items</div>
  <div
    class="border-2 border-green-500 p-2 px-4 mt-5 flex justify-between items-center"
    v-for="shop in shops"
    :key="shop.id"
  >
    <div>
      <p><strong>Shop Name:</strong> {{ shop.shopName }}</p>
      <p><strong>Location:</strong> {{ shop.location }}</p>
    </div>
    <button @click="removeShop(shop.id)">x</button>
  </div>
</template>

<script>
export default {
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
