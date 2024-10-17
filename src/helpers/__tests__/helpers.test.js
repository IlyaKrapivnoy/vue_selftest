import {
  getRandomItem,
  activeIndex,
  updateActiveIndex,
} from "@/helpers/commonFunctions";

describe("getRandomItem", () => {
  it("returns a random item from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const randomItem = getRandomItem(array);

    expect(array).toContain(randomItem);
  });

  it("returns undefined for an empty array", () => {
    const emptyArray = [];
    const randomItem = getRandomItem(emptyArray);

    expect(randomItem).toBeUndefined();
  });

  it("returns a consistent type for random item and undefined return", () => {
    const array = [1, 2, 3, 4, 5];
    const emptyArray = [];
    const randomItemFromArray = getRandomItem(array);
    const randomItemFromEmptyArray = getRandomItem(emptyArray);

    expect(array).toContain(randomItemFromArray);
    expect(randomItemFromEmptyArray).toBeUndefined();
  });
});

describe("activeIndex and updateActiveIndex", () => {
  beforeEach(() => {
    activeIndex.value = "1";
  });

  it("initializes activeIndex with the default value", () => {
    const defaultValue = "1";
    expect(activeIndex.value).toBe(defaultValue);
  });

  it("updates activeIndex and sets value", () => {
    const newValue = "2";
    updateActiveIndex(newValue);
    expect(activeIndex.value).toBe(newValue);
  });
});
