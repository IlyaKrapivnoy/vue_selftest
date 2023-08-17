<template>
  <HeadSetter
    :title="BAND_NAMES_HEAD.title"
    :name="BAND_NAMES_HEAD.name"
    :content="BAND_NAMES_HEAD.content"
  />
  <main class="container mx-auto px-4 mt-20">
    <h1>Sad Rock Band Name Generator</h1>

    <div class="mt-10 text-2xl">
      <p>Your Sad Rock Band Name:</p>
      <div class="flex">
        <el-card
          v-show="bandName"
          class="box-card flex my-3 w-full min-h-[80px]"
        >
          <div class="flex items-center justify-between">
            <p class="font-extralight text-indigo-600 mr-10">
              {{ bandName }}
            </p>

            <el-button @click="saveName" v-show="bandName">
              Save Name
            </el-button>
            <el-button
              type="warning"
              plain
              @click="generateName"
              class="self-start"
            >
              Generate New
            </el-button>
          </div>
        </el-card>

        <el-card
          v-show="!bandName"
          class="box-card flex items-center my-3 w-full min-h-[80px]"
        >
          <div class="flex items-center justify-between">
            <p class="font-extralight text-indigo-600 mr-10">
              Band name will be displayed here...
            </p>

            <el-button
              type="warning"
              plain
              @click="generateName"
              class="self-start"
            >
              Generate Band Name
            </el-button>
          </div>
        </el-card>
      </div>
    </div>
    <div class="my-6">
      <h2>SAVED BAND NAMES:</h2>
      <el-card
        v-for="(band, i) in savedBandNames"
        :key="i"
        class="box-card my-3"
      >
        <p class="font-bold">
          Band name:
          <span class="font-extralight">
            {{ band.name }}
          </span>
        </p>
        <p class="font-bold">
          How rock it is: <span class="font-extralight">{{ band.score }}%</span>
        </p>
      </el-card>

      <p v-show="savedBandNames.length <= 0" class="text-gray-600 mt-3">
        No names have been saved...
      </p>
    </div>
  </main>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import HeadSetter from "@/components/utils/HeadSetter.vue";
import { BAND_NAMES_HEAD } from "@/data/head";

export default {
  computed: {
    BAND_NAMES_HEAD() {
      return BAND_NAMES_HEAD;
    },
  },
  components: { HeadSetter },
  setup() {
    const store = useStore();
    const bandName = ref("");
    const savedBandNames = ref([]);

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

    const saveName = () => {
      const newBandNameData = {
        name: bandName.value,
        score: Math.floor(Math.random() * 101),
      };

      savedBandNames.value.push(newBandNameData);
      generateName();
      console.log("savedBandNames", savedBandNames);
    };

    return { generateName, bandName, saveName, savedBandNames };
  },
};
</script>
