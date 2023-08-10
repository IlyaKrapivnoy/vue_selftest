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
        <router-link to="/">
          <el-menu-item index="1">Home</el-menu-item>
        </router-link>

        <router-link to="/posts">
          <el-menu-item index="2">Posts</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </main>
</template>

<script setup>
import { ref } from "vue";

const activeIndex = ref("1");
</script>

<style>
.logo-nav-item {
  padding-left: 0 !important;
}
.logo-nav-item:hover {
  background-color: transparent !important;
}
</style>
