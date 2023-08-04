<template>
  <div class="container mx-auto px-4">
    <h1>Shop List</h1>
    <button class="mt-6" @click="showDialog">Add Shop</button>
    <!--   form-->
    <my-dialog v-model:show="dialogVisible">
      <shop-form @create="addShop" />
    </my-dialog>
    <!--    list-->
    <shop-list v-if="!isShopsLoading" :shops="shops" @removeShop="removeShop" />
    <my-spinner v-else />
  </div>
</template>

<script>
import ShopList from "@/components/shop/ShopList.vue";
import ShopForm from "@/components/shop/ShopForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import { fetchBooks } from "@/services/bookServices";
import MySpinner from "@/components/UI/MySpinner.vue";

export default {
  name: "ShopListView",
  components: { MySpinner, MyDialog, ShopForm, ShopList },
  data() {
    return {
      shops: [],
      dialogVisible: false,
      isShopsLoading: false,
    };
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
      this.isShopsLoading = true;
      const shopsData = await fetchBooks();
      if (shopsData) {
        this.shops = shopsData.items;
        this.saveToLocalStorage();
        this.isShopsLoading = false;
      }
    },
  },
  created() {
    this.loadFromLocalStorage();
  },
  mounted() {
    this.addShops();
  },
};
</script>
