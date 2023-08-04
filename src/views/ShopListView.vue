<template>
  <div class="container mx-auto px-4">
    <h1>Shop List</h1>
    <button @click="addShops">Fetch Shops</button>
    <button class="mt-6" @click="showDialog">Add Shop</button>
    <!--   form-->
    <my-dialog v-model:show="dialogVisible">
      <shop-form @create="addShop" />
    </my-dialog>
    <!--    list-->
    <shop-list :shops="shops" @removeShop="removeShop" />
  </div>
</template>

<script>
import ShopList from "@/components/shop/ShopList.vue";
import ShopForm from "@/components/shop/ShopForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import { fetchBooks } from "@/services/bookServices";

export default {
  name: "ShopListView",
  components: { MyDialog, ShopForm, ShopList },
  data() {
    return {
      shops: [],
      dialogVisible: false,
    };
  },
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    addShop(shop) {
      this.shops.push(shop);
      this.saveToLocalStorage();
      this.dialogVisible = false;
    },
    removeShop(shop) {
      this.shops = this.shops.filter((el) => el.id !== shop.id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("shops", JSON.stringify(this.shops));
    },
    loadFromLocalStorage() {
      this.shops = JSON.parse(localStorage.getItem("shops") || "[]");
    },
    showDialog() {
      this.dialogVisible = "true";
    },
    async addShops() {
      const shopsData = await fetchBooks();
      if (shopsData) {
        this.shops = shopsData.items;
        this.saveToLocalStorage();
      }
    },
  },
};
</script>
