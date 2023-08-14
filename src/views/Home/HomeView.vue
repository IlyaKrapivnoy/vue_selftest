<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>HOME PAGE</h1>
    <h2 class="mt-6">List of Apps</h2>

    <el-collapse v-model="activeName" accordion class="mt-10">
      <el-collapse-item
        v-for="(app, i) in appList()"
        :key="i"
        :title="getTitle(app, i)"
        :name="i.toString()"
      >
        <div class="mt-3">
          <p>Coming soon...</p>
        </div>
      </el-collapse-item>
    </el-collapse>
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

    getTitle(app, i) {
      return `${this.getOrdinal(i + 1)} App: ${app}`;
    },
  },
};
</script>
