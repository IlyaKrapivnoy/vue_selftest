<template>
  <div class="container mx-auto px-4">
    <h1>Shop List</h1>

    <!--   form-->
    <shop-form @create="addShop" />
    <!--    list-->
    <shop-list :shops="shops" @remove-shop="removeShop" />
  </div>
</template>

<script>
import ShopList from "@/components/shop/ShopList.vue";
import ShopForm from "@/components/shop/ShopForm.vue";

export default {
  name: "ShopListView",
  components: { ShopForm, ShopList },
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
    addShop(shop) {
      this.shops.push(shop);
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
