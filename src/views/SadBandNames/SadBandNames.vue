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

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";
import { BAND_NAMES_HEAD } from "@/data/head";
import CustomCard from "@/components/common/CustomCard/CustomCard.vue";

interface Button {
  name: string;
  type?: string;
  click: () => void;
}

interface BandName {
  id: number;
  name: string;
  score: number;
  comment: string;
}

// Store initialization
const store = useStore();

// Computed properties
const bandName = computed<string>(() => store.state.bandNames.bandName);
const savedBandNames = computed<BandName[]>(
  () => store.state.bandNames.savedBandNames
);

// Sorting logic
const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Score | from big to low", value: "score from big" },
  { label: "Score | from low to big", value: "score from low" },
];
const sortBy = ref<string>("name");
const sortedSavedBandNames = computed<BandName[]>(() => {
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

// Methods definitions
const generateName = (): void => {
  store.commit("generateBandName");
};

onMounted(() => {
  store.commit("generateBandName");
});

const saveName = (): void => {
  store.commit("saveBandName");
};

const removeSavedBandName = (nameId: number): void => {
  store.commit("removeSavedBandName", nameId);
};

// Button definitions
const generateButton: Button = { name: "Generate New", click: generateName };
const bandNameButtons: Button[] = [
  { name: "Save Name", type: "success", click: saveName },
  generateButton,
];
</script>
