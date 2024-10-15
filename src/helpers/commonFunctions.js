import { ref } from "vue";

export const activeIndex = ref(localStorage.getItem("activeIndex") || "1");
export const updateActiveIndex = (index) => {
  activeIndex.value = index;
  localStorage.setItem("activeIndex", index);
};

export const getRandomItem = (array) => {
  if (!Array.isArray(array) || array.length === 0) return;
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};
