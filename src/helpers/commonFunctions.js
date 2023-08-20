import { ref } from "vue";

export const activeIndex = ref(localStorage.getItem("activeIndex") || "1");
export const setActiveIndex = (index) => {
  activeIndex.value = index;
  localStorage.setItem("activeIndex", index);
};

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
