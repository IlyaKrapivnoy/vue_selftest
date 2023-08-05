<template>
  <div
    class="border-2 border-green-500 p-2 px-4 mt-5 flex justify-between items-center"
  >
    <div>
      <p>
        <strong>Shop Name:</strong>
        {{ shop?.volumeInfo?.publisher || shop?.shopName || "No Shop Name" }}
      </p>
      <p>
        <strong>Location:</strong>
        {{ shop?.saleInfo?.country || shop?.location || "No Location" }}
      </p>
    </div>
    <div class="flex flex-col">
      <button @click="$emit('removeShop', shop)">x</button>
      <button @click="handleOpenSignShopPage">Open</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleOpenSignShopPage() {
      this.$router.push(
        this.shop?.shopName
          ? `/shoplist/${this.shop.shopName}`
          : `/shoplist/${this.shop?.volumeInfo?.publisher}`
      );
    },
  },
};
</script>
