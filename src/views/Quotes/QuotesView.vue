<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Quotes Page</h1>
    <div class="mt-10">
      <div class="flex justify-between">
        <el-select v-model="selectedCategory" placeholder="Select a category">
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>

        <el-button @click="generateQuote" type="primary" class="w-[240px]">
          Generate Quote
        </el-button>
      </div>

      <QuoteDisplay :quote="currentQuote" />
    </div>
  </main>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import QuoteDisplay from "@/views/Quotes/partials/QuoteDisplay.vue";
import camusQuotes from "@/data/quotes";

export default {
  components: {
    QuoteDisplay,
  },
  setup() {
    const quotes = camusQuotes;
    const selectedCategory = ref("math");
    const currentQuote = ref("");

    const generateQuote = () => {
      let filteredQuotes = quotes;
      if (selectedCategory.value) {
        filteredQuotes = quotes.filter(
          (quote) => quote.category === selectedCategory.value
        );
      }

      if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        currentQuote.value = filteredQuotes[randomIndex];
      } else {
        currentQuote.value = "";
      }
    };

    const categories = computed(() => [
      ...new Set(quotes.map((q) => q.category)),
    ]);

    onMounted(() => {
      generateQuote();
    });

    watch(selectedCategory, () => {
      generateQuote();
    });

    return {
      currentQuote,
      generateQuote,
      selectedCategory,
      categories,
    };
  },
};
</script>
