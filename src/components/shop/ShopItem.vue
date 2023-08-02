<template>
  <div
    class="border-2 border-green-500 p-2 px-4 mt-5 flex justify-between items-center"
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
    shop: {
      type: Object,
      required: true,
    },
  },
};
</script>
