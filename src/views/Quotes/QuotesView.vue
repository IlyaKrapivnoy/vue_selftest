<template>
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
            >
              <el-option label="🇺🇸 English" value="en" />
              <el-option label="🇩🇪 German" value="de" />
            </el-select>
          </div>
        </div>

        <el-button @click="generateQuote" type="primary" class="w-[240px]">
          Generate Quote
        </el-button>
      </div>

      <QuoteDisplay
        :quote="currentQuote"
        @increaseLikes="increaseLikes"
        @decreaseLikes="decreaseLikes"
      />
    </div>
  </main>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import QuoteDisplay from "@/views/Quotes/partials/QuoteDisplay.vue";
import { useStore } from "vuex";

export default {
  components: {
    QuoteDisplay,
  },
  setup() {
    const store = useStore();
    const quoteModule = store.state.quotes;

    const quotes = computed(() => quoteModule.quotes);

    const selectedLang = ref("en");
    const selectedCategory = ref("math");
    const currentQuote = ref("");

    const generateQuote = () => {
      let filteredQuotes = quotes.value.filter(
        (quote) =>
          quote.lang === selectedLang.value &&
          quote.category === selectedCategory.value
      );

      if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        currentQuote.value = filteredQuotes[randomIndex];
      } else {
        currentQuote.value = null;
      }
    };

    const categories = computed(() => [
      ...new Set(quotes.value.map((q) => q.category)),
    ]);

    const increaseLikes = () => {
      if (currentQuote.value) {
        store.commit("incrementLikes", currentQuote.id);
      }
    };

    const decreaseLikes = () => {
      if (currentQuote.value) {
        store.commit("decrementLikes", currentQuote.value.id);
      }
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

    return {
      currentQuote,
      generateQuote,
      selectedLang,
      selectedCategory,
      categories,
      decreaseLikes,
      increaseLikes,
    };
  },
};
</script>
