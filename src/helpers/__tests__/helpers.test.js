import { getRandomItem } from "@/helpers/commonFunctions";

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

  it("matches snapshot for random item and undefined return", () => {
    const array = [1, 2, 3, 4, 5];
    const emptyArray = [];
    const randomItemFromArray = getRandomItem(array);
    const randomItemFromEmptyArray = getRandomItem(emptyArray);

    expect(randomItemFromArray).toMatchSnapshot("randomItemFromArray");
    expect(randomItemFromEmptyArray).toMatchSnapshot(
      "randomItemFromEmptyArray"
    );
  });
});
