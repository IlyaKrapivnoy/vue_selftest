<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>HOME PAGE</h1>
    <h2 class="mt-6">List of Apps</h2>
    <ul class="pl-10 mt-4">
      <li
        v-for="(app, i) in appList()"
        :key="i"
        :class="{
          capitalize: i !== appList().length - 1,
        }"
        class="pl-5 list-none custom-list-disc text-indigo-300 font-bold"
      >
        {{ app }}
      </li>
    </ul>
  </main>
</template>

<script>
import appList from "@/data/appList";

export default {
  name: "HomeView",
  methods: {
    appList() {
      return appList;
    },
  },
};
</script>

<style scoped>
.custom-list-disc::before {
  content: "\2022";
  color: #2a2a2a;
  display: inline-block;
  width: 20px;
  margin-left: -20px;
}
</style>
