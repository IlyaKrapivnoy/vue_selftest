import quotes from "@/data/quotes";

export const quotesModule = {
  state() {
    return {
      quotes: quotes,
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
  },
};
