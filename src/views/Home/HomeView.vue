<template>
  <HeadSetter
    :title="HEAD_METADATA.HOME.title"
    :name="HEAD_METADATA.HOME.name"
    :content="HEAD_METADATA.HOME.content"
  />
  <main class="container mx-auto px-4 mt-20">
    <h1>HOME PAGE</h1>
    <h2 class="mt-6">List of Apps</h2>

    <el-collapse v-model="activeName" accordion class="my-6">
      <el-collapse-item
        v-for="(app, i) in appList"
        :key="app.id"
        :title="getTitle(app, i)"
        :name="i.toString()"
        v-show="app.title !== 'Home'"
      >
        <ul class="mt-3" :class="{ 'list-disc': app.description.length > 1 }">
          <li
            v-for="(description, index) in app.description"
            :key="index"
            class="mt-2 ml-6"
          >
            {{ description }}
          </li>
          <el-button
            @click="goToApp(app)"
            type="primary"
            plain
            class="w-[180px] mt-6 capitalize"
          >
            See {{ app.path }} app
          </el-button>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </main>
</template>

<script setup>
import { ref } from "vue";
import appList from "@/data/navData";
import router from "@/router";
import { updateActiveIndex } from "@/helpers/commonFunctions";
import { HEAD_METADATA } from "@/data/head";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";

const activeName = ref("0");

const getOrdinal = (number) => {
  const suffixes = ["st", "nd", "rd"];
  const suffix =
    number > 10 && number < 20 ? "th" : suffixes[(number - 1) % 10] || "th";
  return `${number}${suffix}`;
};

const getTitle = (app, i) => `${getOrdinal(i)} App: ${app.title}`;

const goToApp = (app) => {
  router.push(app.path);
  updateActiveIndex(app.id);
};
</script>
