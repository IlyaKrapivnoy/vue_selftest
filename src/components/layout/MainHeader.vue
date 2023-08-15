<template>
  <main class="container mx-auto">
    <el-menu
      :default-active="activeIndex.toString()"
      class="el-menu-demo flex justify-between uppercase"
      mode="horizontal"
    >
      <router-link to="/" @click="setActiveIndex(0)">
        <el-menu-item index="1" class="logo-nav-item">
          <div class="flex flex-col items-center cursor-pointer ml-4">
            <div class="text-3xl font-bold text-indigo-300">Logo</div>
            <div class="text-xs text-gray-500">practice inc.</div>
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
import { activeIndex, setActiveIndex } from "@/common/activeIndexNav";

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
</style>
