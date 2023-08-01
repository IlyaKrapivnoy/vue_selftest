<template>
  <div class="container mx-auto px-4">
    <h1>Shop List</h1>

    <div class="mt-10">
      <h2>Add a new shop</h2>
      <form @submit.prevent class="flex flex-col w-full">
        <input
          type="text"
          placeholder="Shop name"
          v-bind:value="shopName"
          @input="shopName = $event.target.value"
        />
        <input
          type="text"
          placeholder="Location"
          v-bind:value="location"
          @input="location = $event.target.value"
        />
        <button @click="addShop" class="mt-6">Add</button>
      </form>
    </div>

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
  </div>
</template>

<script>
export default {
  name: "ShopListView",
  data() {
    return {
      shops: [
        { id: 1, shopName: "H&M", location: "Lisbon" },
        { id: 2, shopName: "Adidas", location: "Berlin" },
        { id: 3, shopName: "Under Armour", location: "Paris" },
      ],
      shopName: "",
      location: "",
    };
  },
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    addShop() {
      const newShop = {
        id: Date.now(),
        shopName: this.shopName,
        location: this.location,
      };
      this.shops.push(newShop);
      this.shopName = "";
      this.location = "";
      this.saveToLocalStorage();
    },
    removeShop(id) {
      this.shops = this.shops.filter((el) => el.id !== id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("shops", JSON.stringify(this.shops));
    },
    loadFromLocalStorage() {
      const storedShops = JSON.parse(localStorage.getItem("shops") || "[]");
      this.shops = storedShops;
    },
  },
};
</script>
