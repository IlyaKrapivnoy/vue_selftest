import quotes from "@/data/quotes";

export const quotesModule = {
  state() {
    return {
      quotes: quotes,
      selectedLang: "en",
      selectedCategory: "math",
      currentQuote: null,
    };
  },
  mutations: {
    incrementLikes(state, quoteId) {
      const quote = state.quotes.find((quote) => quote.id === quoteId);
      if (quote) {
        quote.likes++;
      }
    },
    decrementLikes(state, quoteId) {
      const quote = state.quotes.find((quote) => quote.id === quoteId);
      if (quote) {
        quote.likes--;
      }
    },
    setSelectedLang(state, lang) {
      state.selectedLang = lang;
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    setCurrentQuote(state, quote) {
      state.currentQuote = quote;
    },
  },
};
