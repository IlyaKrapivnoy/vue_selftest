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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useHead } from "@unhead/vue";

export default {
  setup() {
    useHead({
      title: "Rock Band Name | Vue.js",
      meta: [
        {
          name: "description",
          content: "This page helps you to create the best Sad Rock Band Name",
        },
      ],
    });
    const store = useStore();
    const bandName = ref("");

    const storedBandNames = computed(() => store.state.bandNames);

    const generateName = () => {
      const adjective = getRandomItem(storedBandNames.value.bandAdjectives);
      const noun = getRandomItem(storedBandNames.value.bandNouns);
      const suffix = getRandomItem(storedBandNames.value.bandSuffixes);
      bandName.value = `${adjective} ${noun} ${suffix}`;
    };

    const getRandomItem = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };

    return { generateName, bandName };
  },
};
</script>
