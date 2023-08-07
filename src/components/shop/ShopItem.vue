<template>
  <div
    class="border-2 border-green-500 p-2 px-4 mt-5 flex justify-between items-center"
  >
    <div>
      <p>
        <strong>Shop Name:</strong>
        {{ displayShopName }}
      </p>
      <p>
        <strong>Location:</strong>
        {{ displayShopLocation }}
      </p>
    </div>
    <div class="flex flex-col">
      <button @click="removeShop">x</button>
      <button @click="handleOpenSignShopPage">Open</button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit, router }) {
    const displayShopName = computed(
      () =>
        props.shop?.volumeInfo?.publisher ||
        props.shop?.shopName ||
        "No Shop Name"
    );

    const displayShopLocation = computed(
      () =>
        props.shop?.saleInfo?.country || props.shop?.location || "No Location"
    );

    const removeShop = () => {
      emit("removeShop", props.shop);
    };

    const handleOpenSignShopPage = () => {
      const shopName =
        props.shop?.shopName || props.shop?.volumeInfo?.publisher;
      if (shopName) {
        router.push(`/shoplist/${shopName}`);
      }
    };

    return {
      displayShopName,
      displayShopLocation,
      removeShop,
      handleOpenSignShopPage,
    };
  },
});
</script>
