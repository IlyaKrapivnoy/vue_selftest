import bandNameData from "@/data/band";
import { getRandomItem } from "@/helpers/commonFunctions";

const { adjectives, nouns, suffixes, comments } = bandNameData;
export const bandNamesModule = {
  state: () => ({
    bandAdjectives: adjectives,
    bandNouns: nouns,
    bandSuffixes: suffixes,
    savedBandNames: [],
    bandName: "",
  }),
  mutations: {
    generateBandName(state) {
      const adjective = getRandomItem(state.bandAdjectives);
      const noun = getRandomItem(state.bandNouns);
      const suffix = getRandomItem(state.bandSuffixes);
      state.bandName = `${adjective} ${noun} ${suffix}`;
    },
    saveBandName(state) {
      if (state.bandName) {
        const newBandNameData = {
          id: Date.now(),
          name: state.bandName,
          score: Math.floor(Math.random() * 101),
          comment: getRandomItem(comments),
        };
        state.savedBandNames.push(newBandNameData);
        state.bandName = "";
      }
    },
    removeSavedBandName(state, nameId) {
      state.savedBandNames = state.savedBandNames.filter(
        (name) => name.id !== nameId
      );
    },
  },
};
