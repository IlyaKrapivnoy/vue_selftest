<template>
  <div class="container mx-auto px-4">
    <h1>Shop List</h1>
    <div class="flex flex-col">
      <my-input
        v-focus
        v-model="searchedQuery"
        placeholder="Search by shop name..."
      />
      <button class="mt-6" @click="showDialog">Add Shop</button>
    </div>
    <!-- form -->
    <my-dialog v-model:show="dialogVisible">
      <my-form
        :formTitle="formTitle"
        :formFields="formFields"
        @form-submitted="addShop"
      />
    </my-dialog>

    <!-- list -->
    <my-item-list
      v-if="!isShopsLoading"
      :items="searchedShops"
      listTitle="Shop List"
      label1="Shop Name"
      label2="Location"
      containerClass="border-2 border-green-500 p-2 px-4 mt-5 flex justify-between items-center"
      routePath="shoplist"
      noItemsMessage="There are no shops."
      @removeItem="removeShop"
    />
    <my-spinner v-else />
    <my-pagination
      v-if="!isShopsLoading && totalPages > 1"
      :page="page"
      :totalPages="totalPages"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import MyDialog from "@/components/MyDialog.vue";
import { fetchBooks } from "@/services/bookServices";
import MySpinner from "@/components/MySpinner.vue";
import MyInput from "@/components/MyInput.vue";
import MyPagination from "@/components/MyPagination.vue";
import MyForm from "@/components/MyForm.vue";
import MyItemList from "@/components/MyItemList.vue";

export default {
  name: "ShopListView",
  components: {
    MyItemList,
    MyForm,
    MyPagination,
    MyInput,
    MySpinner,
    MyDialog,
  },
  data() {
    return {
      shops: [],
      dialogVisible: false,
      isShopsLoading: false,
      searchedQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      formTitle: "Add a new shop",
      formFields: [
        { name: "shopName", placeholder: "Shop name" },
        { name: "location", placeholder: "Location" },
      ],
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
      this.dialogVisible = true;
    },
    changePage(changePage) {
      this.page = changePage;
      this.addShops();
    },
    async addShops() {
      this.isShopsLoading = true;
      try {
        const shopsData = await fetchBooks(this.page, this.limit);
        if (shopsData) {
          this.shops = shopsData.items;
          this.totalPages = Math.ceil(
            (shopsData.totalItems = 100 / this.limit)
          );
          this.saveToLocalStorage();
        }
      } catch (error) {
        console.warn("Error fetching data:", error);
      } finally {
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
