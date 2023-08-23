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
        :cardTextLight="bandName || 'Band name will be displayed here...'"
        :buttons="bandNameButtons"
      />
    </section>

    <section class="my-6">
      <div class="flex justify-between items-center">
        <h2>SAVED BAND NAMES:</h2>
        <div class="flex justify-end mb-3">
          <el-select v-model="sortBy" placeholder="Sort by">
            <el-option
              v-for="option in sortOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>
      </div>
      <el-card
        v-for="band in sortedSavedBandNames"
        :key="band.id"
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
          <span class="font-extralight">{{ band.name }}</span>
        </p>
        <p class="font-bold">
          How rock it is: <span class="font-extralight">{{ band.score }}%</span>
        </p>
        <p class="font-bold">
          User Opinion:
          <span class="font-extralight">{{ band.comment }}</span>
        </p>
      </el-card>

      <p v-show="sortedSavedBandNames.length <= 0" class="text-gray-600 mt-3">
        No names have been saved...
      </p>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";
import { BAND_NAMES_HEAD } from "@/data/head";
import CustomCard from "@/components/common/CustomCard/CustomCard.vue";

const store = useStore();
const bandName = computed(() => store.state.bandNames.bandName);
const savedBandNames = computed(() => store.state.bandNames.savedBandNames);

const sortBy = ref("name");
const sortedSavedBandNames = computed(() => {
  const copyOfSavedBandNames = [...savedBandNames.value];

  return copyOfSavedBandNames.sort((a, b) => {
    if (sortBy.value === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy.value === "score from low") {
      return b.score - a.score;
    } else if (sortBy.value === "score from big") {
      return a.score - b.score;
    }
  });
});

const generateName = () => {
  store.commit("generateBandName");
};

const saveName = () => {
  store.commit("saveBandName");
};

const removeSavedBandName = (nameId) => {
  store.commit("removeSavedBandName", nameId);
};

const bandNameButtons = [
  { name: "Save Name", type: "success", click: saveName },
  { name: "Generate New", click: generateName },
];

const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Score | from big to low", value: "score from big" },
  { label: "Score | from low to big", value: "score from low" },
];
</script>
