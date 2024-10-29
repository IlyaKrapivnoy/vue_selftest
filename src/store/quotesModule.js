import quotes from "@/data/quotes";

export const quotesModule = {
  state: () => ({
    quotes: quotes,
    selectedLang: "en",
    selectedCategory: "math",
    currentQuote: null,
    likeStatus: false,
    dislikeStatus: false,
  }),
  mutations: {
    incrementLikes(state, quoteId) {
      const quote = state.quotes.find((quote) => quote.id === quoteId);
      if (quote) {
        if (!state.likeStatus) {
          quote.likes++;
          state.likeStatus = true;

          if (state.dislikeStatus) {
            quote.likes++;
            state.dislikeStatus = false;
          }
        } else {
          quote.likes--;
          state.likeStatus = false;
        }
      }
    },
    decrementLikes(state, quoteId) {
      const quote = state.quotes.find((quote) => quote.id === quoteId);
      if (quote) {
        if (!state.dislikeStatus) {
          quote.likes--;
          state.dislikeStatus = true;
          if (state.likeStatus) {
            quote.likes--;
            state.likeStatus = false;
          }
        } else {
          quote.likes++;
          state.dislikeStatus = false;
        }
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
      state.likeStatus = false;
      state.dislikeStatus = false;
    },
  },
};
