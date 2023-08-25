<template>
  <div class="w-full flex">
    <el-button @click="$emit('decrease')" type="success" plain class="w-1/3">
      -
    </el-button>
    <el-button @click="$emit('increase')" type="success" plain class="w-1/3">
      +
    </el-button>
    <el-button @click="$emit('reset')" type="danger" plain class="w-1/3">
      reset
    </el-button>
  </div>
</template>
