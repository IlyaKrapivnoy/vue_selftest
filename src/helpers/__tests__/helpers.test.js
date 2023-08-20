import { getRandomItem } from "../commonFunctions";

describe("getRandomItem", () => {
  it("returns a random item from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const randomItem = getRandomItem(array);

    expect(array).toContain(randomItem);
    expect(randomItem).toMatchSnapshot("randomItem");
  });

  it("returns undefined for an empty array", () => {
    const emptyArray = [];
    const randomItem = getRandomItem(emptyArray);

    expect(randomItem).toBeUndefined();
  });
});
