<template>
  <main class="container mx-auto">
    <el-menu
      :default-active="activeIndex.toString()"
      class="el-menu-demo flex justify-between items-center uppercase h-[80px]"
      mode="horizontal"
    >
      <router-link to="/" @click="setActiveIndex(0)">
        <el-menu-item index="1" class="logo-nav-item">
          <div class="flex flex-col items-center cursor-pointer ml-4 mb-2">
            <div class="text-3xl font-bold text-indigo-300">
              <img
                src="../../../../public/logo.png"
                alt="logo"
                class="w-[80px]"
              />
            </div>
            <div class="text-[10px] text-gray-500 -mt-3 leading-4">
              practice inc.
            </div>
          </div>
        </el-menu-item>
      </router-link>

      <div class="flex">
        <router-link
          v-for="link in navData"
          :key="link.id"
          :to="link.path"
          @click="setActiveIndex(link.id)"
        >
          <el-menu-item :index="link.id.toString()">{{
            link.title
          }}</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import navData from "@/data/navData";
import { activeIndex, setActiveIndex } from "@/helpers/commonFunctions";

onMounted(() => {
  localStorage.setItem("activeIndex", activeIndex.value);
});
</script>

<style>
.logo-nav-item {
  padding-left: 0 !important;
}

.logo-nav-item:hover {
  background-color: transparent !important;
}

.el-sub-menu .el-icon {
  height: 80px;
}

.el-sub-menu__title {
  padding-right: 20px !important;
}
</style>
