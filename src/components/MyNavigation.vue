<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo flex justify-center uppercase"
    mode="horizontal"
    @select="handleSelect"
  >
    <router-link to="/">
      <el-menu-item index="1">Home</el-menu-item>
    </router-link>

    <router-link to="/bookshelf">
      <el-menu-item index="2">Bookshelf</el-menu-item>
    </router-link>
  </el-menu>
</template>
