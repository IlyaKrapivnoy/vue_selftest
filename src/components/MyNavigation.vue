<template>
  <main class="container mx-auto">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo flex justify-between uppercase"
      mode="horizontal"
      @select="handleSelect"
    >
      <div
        class="flex flex-col items-center cursor-pointer ml-4"
        @click="navigateToHome"
      >
        <div class="text-3xl font-bold text-indigo-300">Logo</div>
        <div class="text-xs text-gray-500">practice inc.</div>
      </div>

      <div class="flex">
        <router-link to="/">
          <el-menu-item index="1">Home</el-menu-item>
        </router-link>

        <router-link to="/bookshelf">
          <el-menu-item index="2">Bookshelf</el-menu-item>
        </router-link>
      </div>
    </el-menu>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToHome = () => {
  router.push("/");
};
</script>
