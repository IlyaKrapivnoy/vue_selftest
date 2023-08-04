<template>
  <div class="container mx-auto px-4">
    <h1>Shop List</h1>
    <div class="flex flex-col">
      <my-input v-model="searchedQuery" placeholder="Search by shop name..." />
      <button class="mt-6" @click="showDialog">Add Shop</button>
    </div>
    <!--   form-->
    <my-dialog v-model:show="dialogVisible">
      <shop-form @create="addShop" />
    </my-dialog>
    <!--    list-->
    <shop-list
      v-if="!isShopsLoading"
      :shops="searchedShops"
      @removeShop="removeShop"
    />
    <my-spinner v-else />
  </div>
</template>

<script>
import ShopList from "@/components/shop/ShopList.vue";
import ShopForm from "@/components/shop/ShopForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import { fetchBooks } from "@/services/bookServices";
import MySpinner from "@/components/UI/MySpinner.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  name: "ShopListView",
  components: { MyInput, MySpinner, MyDialog, ShopForm, ShopList },
  data() {
    return {
      shops: [],
      dialogVisible: false,
      isShopsLoading: false,
      searchedQuery: "",
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
  computed: {
    searchedShops() {
      if (!this.searchedQuery) {
        return this.shops;
      }
      const query = this.searchedQuery.toLowerCase().trim();
      return this.shops.filter((shop) => {
        const shopName =
          (shop?.shopName || shop?.volumeInfo?.publisher)?.toLowerCase() || "";
        return shopName.includes(query);
      });
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
