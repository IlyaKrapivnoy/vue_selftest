import { adjectives, nouns, suffixes } from "@/data/band";

export const bandNamesModule = {
  state() {
    return {
      bandAdjectives: adjectives,
      bandNouns: nouns,
      bandSuffixes: suffixes,
    };
  },
  mutations: {},
};
