<template>
  <HeadSetter
    :title="HEAD_METADATA.BAND_NAMES.title"
    :name="HEAD_METADATA.BAND_NAMES.name"
    :content="HEAD_METADATA.BAND_NAMES.content"
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

    <MyAlert
      :isAlert="isAlert"
      :wrapperClass="'alert'"
      :title="'Warning Alert'"
      :type="'warning'"
      :description="alertMessage"
      :showIcon="true"
      :closable="false"
    />

    <section class="my-6">
      <div class="flex justify-between items-center">
        <h2>SAVED BAND NAMES:</h2>
        <div class="flex justify-end mb-3">
          <el-select
            v-model="sortBy"
            placeholder="Sort by"
            style="width: 130px"
          >
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
import { HEAD_METADATA } from "@/data/head";
import CustomCard from "@/components/common/CustomCard/CustomCard.vue";
import MyAlert from "@/components/common/MyAlert/MyAlert.vue";

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

const isAlert = ref<boolean>(false);
const alertMessage = ref<string>(
  "You need to generate a band name before saving it."
);

// Sorting logic
const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Score ↑", value: "score from big to low" },
  { label: "Score ↓", value: "score from low to big" },
];
const sortBy = ref<string>("Sort by...");
const sortedSavedBandNames = computed<BandName[]>(() => {
  const copyOfSavedBandNames = [...savedBandNames.value];
  return copyOfSavedBandNames.sort((a, b) => {
    if (sortBy.value === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy.value === "score from big to low") {
      return b.score - a.score;
    } else if (sortBy.value === "score from low to big") {
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
  if (!bandName.value) {
    isAlert.value = true;
    alertMessage.value = "Generate name before saving it";

    setTimeout(() => {
      isAlert.value = false;
    }, 3000);

    return;
  }

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
