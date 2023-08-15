<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Sad Rock Band Name Generator</h1>

    <div class="flex flex-col mt-10">
      <span class="text-gray-500">Click Me:</span>
      <el-button type="warning" plain @click="generateName" class="self-start"
        >Generate Band Name</el-button
      >
    </div>
    <div class="mt-10 text-2xl">
      <p>
        Your Sad Rock Band Name:
        <span v-if="bandName" class="font-bold text-indigo-600">
          {{ bandName }}
        </span>
      </p>
    </div>
  </main>
</template>

<script>
import { adjectives, nouns, suffixes } from "@/data/band";
import { ref } from "vue";

export default {
  setup() {
    const bandName = ref("");

    const generateName = () => {
      const adjective = getRandomItem(adjectives);
      const noun = getRandomItem(nouns);
      const suffix = getRandomItem(suffixes);
      bandName.value = `${adjective} ${noun} ${suffix}`;
    };

    const getRandomItem = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };

    return { generateName, bandName };
  },
};
</script>
