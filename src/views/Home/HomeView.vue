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
        class="pl-5 mt-3 list-none text-indigo-300 font-bold text-xl"
      >
        <span class="ordinal">{{ getOrdinal(i + 1) }}</span> App:
        <span class="text-gray-600">{{ app }}</span>
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

    getOrdinal(number) {
      const suffixes = ["st", "nd", "rd"];
      const suffix =
        number > 10 && number < 20 ? "th" : suffixes[(number - 1) % 10] || "th";
      return `${number}${suffix}`;
    },
  },
};
</script>
