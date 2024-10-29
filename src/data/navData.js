const navData = [
  {
    id: 0,
    path: "/",
    title: "Home",
    description: [],
  },
  {
    id: 1,
    path: "/todo",
    title: "Todo",
    description: [
      "you can fetch todos",
      "you can remove single one or all todos by one click",
      "you can mark one as done or all of them",
      "there is a spinner on loading",
      "all data saved to localStorage",
      "there is a pagination from Element UI",
      "and of course you can add a new task",
    ],
  },
  {
    id: 2,
    path: "/quotes",
    title: "Quote",
    description: [
      "you can generate random quote",
      "you can pick up a category",
      "you can pick up a language: en / de",
    ],
  },
  {
    id: 3,
    path: "/quiz",
    title: "Quiz",
    description: [
      "I've used mocked data",
      "it counts score",
      "it can show different result message related on your score",
    ],
  },
  {
    id: 4,
    path: "/band-names",
    title: "Random Names",
    description: ["get your sad band name by clicking on a button"],
  },
  {
    id: 5,
    path: "/counter",
    title: "Counter",
    description: [
      "increase / decrease counter",
      "prevent manipulations with negative numbers",
      "save data to Vuex store",
      "save amount of total operations to sessionStorage",
    ],
  },
];
export default navData;
