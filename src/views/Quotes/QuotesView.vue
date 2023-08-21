<template>
  <HeadSetter
    :title="QUOTES_HEAD.title"
    :name="QUOTES_HEAD.name"
    :content="QUOTES_HEAD.content"
  />
  <main class="container mx-auto px-4 mt-20">
    <h1>Quotes Page</h1>
    <div class="mt-10">
      <div class="flex justify-between items-center">
        <div class="flex gap-5">
          <div class="flex flex-col">
            <label for="categorySelect" class="text-gray-600 text-sm"
              >Select a category:</label
            >
            <el-select
              v-model="selectedCategory"
              id="categorySelect"
              placeholder="Select a category"
              @change="handleCategoryChange"
            >
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category"
              />
            </el-select>
          </div>

          <!-- Language Selector -->
          <div class="flex flex-col">
            <label for="langSelect" class="text-gray-600 text-sm"
              >Select a language:</label
            >
            <el-select
              v-model="selectedLang"
              id="langSelect"
              placeholder="Select a language"
              @change="handleLangChange"
            >
              <el-option label="🇺🇸 English" value="en" />
              <el-option label="🇩🇪 German" value="de" />
            </el-select>
          </div>
        </div>

        <el-button @click="handleGenerateQuote" type="primary" class="w-[240px]"
          >Generate Quote</el-button
        >
      </div>

      <QuoteDisplay
        :quote="currentQuote"
        @increaseLikes="increaseLikes"
        @decreaseLikes="decreaseLikes"
      />
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import QuoteDisplay from "@/views/Quotes/partials/QuoteDisplay.vue";
import { useStore } from "vuex";
import { QUOTES_HEAD } from "@/data/head";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";

const store = useStore();
const quoteModule = store.state.quotes;

const quotes = computed(() => quoteModule.quotes);
const selectedLang = computed(() => quoteModule.selectedLang);
const selectedCategory = computed(() => quoteModule.selectedCategory);
const currentQuote = computed(() => quoteModule.currentQuote);

const generateQuote = () => {
  let filteredQuotes = quotes.value.filter(
    (quote) =>
      quote.lang === selectedLang.value &&
      quote.category === selectedCategory.value
  );

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    store.commit("setCurrentQuote", filteredQuotes[randomIndex]);
  } else {
    store.commit("setCurrentQuote", null);
  }
};

const categories = computed(() => [
  ...new Set(quotes.value.map((q) => q.category)),
]);

const increaseLikes = () => {
  if (currentQuote.value) {
    store.commit("incrementLikes", currentQuote.value.id);
  }
};

const decreaseLikes = () => {
  if (currentQuote.value) {
    store.commit("decrementLikes", currentQuote.value.id);
  }
};

const handleLangChange = (selectedLang) => {
  store.commit("setSelectedLang", selectedLang);
};

const handleCategoryChange = (selectedCategory) => {
  store.commit("setSelectedCategory", selectedCategory);
};

const handleGenerateQuote = () => {
  generateQuote();
};

onMounted(() => {
  generateQuote();
});

watch(selectedCategory, () => {
  generateQuote();
});

watch(selectedLang, () => {
  generateQuote();
});
</script>
