<template>
  <main class="container mx-auto">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo flex justify-between uppercase"
      mode="horizontal"
    >
      <router-link to="/">
        <el-menu-item index="1" class="logo-nav-item">
          <div class="flex flex-col items-center cursor-pointer ml-4">
            <div class="text-3xl font-bold text-indigo-300">Logo</div>
            <div class="text-xs text-gray-500">practice inc.</div>
          </div>
        </el-menu-item>
      </router-link>

      <div class="flex">
        <router-link to="/" @click="setActiveIndex('1')">
          <el-menu-item index="1">Home</el-menu-item>
        </router-link>

        <router-link to="/todo" @click="setActiveIndex('3')">
          <el-menu-item index="3">Todos</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";

const activeIndex = ref(localStorage.getItem("activeIndex") || "1");

const setActiveIndex = (index) => {
  activeIndex.value = index;
  localStorage.setItem("activeIndex", index);
};

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
