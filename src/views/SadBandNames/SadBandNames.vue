<template>
  <HeadSetter
    :title="BAND_NAMES_HEAD.title"
    :name="BAND_NAMES_HEAD.name"
    :content="BAND_NAMES_HEAD.content"
  />
  <main class="container mx-auto px-4 mt-20">
    <h1>Sad Rock Band Name Generator</h1>

    <section class="mt-10 text-2xl">
      <h2>Your Sad Rock Band Name:</h2>

      <CustomCard
        v-show="bandName"
        :cardTextLight="`${bandName}`"
        :buttons="[
          { name: 'Save Name', type: 'success', click: saveName },
          { name: 'Generate New', click: generateName },
        ]"
      />

      <CustomCard
        v-show="!bandName"
        :cardTextLight="`Band name will be displayed here...`"
        :buttons="[{ name: 'Generate Band Name', click: generateName }]"
      />
    </section>

    <section class="my-6">
      <h2>SAVED BAND NAMES:</h2>
      <el-card
        v-for="band in savedBandNames"
        :key="`${band.id}`"
        class="box-card my-3"
      >
        <el-button
          @click.stop="removeSavedBandName(band.id)"
          class="float-right py-3 px-0"
        >
          Remove
        </el-button>

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
    </section>
  </main>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import HeadSetter from "@/components/utils/HeadSetter.vue";
import { BAND_NAMES_HEAD } from "@/data/head";
import CustomCard from "@/components/utils/CustomCard.vue";

export default {
  computed: {
    BAND_NAMES_HEAD() {
      return BAND_NAMES_HEAD;
    },
  },
  components: { CustomCard, HeadSetter },
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
        id: Date.now(),
        name: bandName.value,
        score: Math.floor(Math.random() * 101),
      };

      savedBandNames.value.push(newBandNameData);
      generateName();
      console.log("savedBandNames", savedBandNames);
    };

    const removeSavedBandName = (nameId) => {
      savedBandNames.value = savedBandNames.value.filter(
        (name) => name.id !== nameId
      );
    };

    return {
      generateName,
      bandName,
      saveName,
      savedBandNames,
      removeSavedBandName,
    };
  },
};
</script>
