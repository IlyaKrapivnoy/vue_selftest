<template>
  <main class="container mx-auto px-4 mt-20">
    <h1>Quotes Page</h1>
    <div class="mt-10">
      <el-button @click="generateQuote" type="primary">
        Generate Quote
      </el-button>

      <QuoteDisplay :quote="currentQuote" />
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import QuoteDisplay from "@/views/Quotes/partials/QuoteDisplay.vue";
import camusQuotes from "@/data/quotes";

export default {
  components: {
    QuoteDisplay,
  },
  setup() {
    const quotes = camusQuotes;

    const currentQuote = ref("");
    const generateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      currentQuote.value = quotes[randomIndex];
    };

    return {
      currentQuote,
      generateQuote,
    };
  },
};
</script>
