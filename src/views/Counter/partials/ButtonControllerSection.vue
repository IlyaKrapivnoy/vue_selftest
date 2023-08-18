<template>
  <div class="w-full flex">
    <el-button @click="$emit('decrease')" type="success" plain class="w-1/2">
      -
    </el-button>
    <el-button @click="$emit('increase')" type="success" plain class="w-1/2">
      +
    </el-button>
  </div>
  <el-button @click="$emit('reset')" type="danger" plain class="w-full mt-4">
    reset
  </el-button>
</template>
