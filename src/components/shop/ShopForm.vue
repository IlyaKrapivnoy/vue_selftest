<template>
  <div class="mt-10">
    <h2>Add a new shop</h2>
    <form @submit.prevent class="flex flex-col w-full">
      <my-input type="text" placeholder="Shop name" v-model="shop.shopName" />
      <my-input type="text" placeholder="Location" v-model="shop.location" />
      <button @click="addShop" class="mt-6">Add</button>
    </form>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: { MyInput },
  data() {
    return {
      shop: {
        shopName: "",
        location: "",
      },
    };
  },
  methods: {
    addShop() {
      this.shop.id = Date.now();
      this.$emit("create", this.shop);
      this.shop = {
        shopName: "",
        location: "",
      };
    },
  },
  emits: ["create"],
};
</script>
