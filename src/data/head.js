const createHeadMetaData = (title, description) => ({
  title: `${title} | Vue.js`,
  name: "description",
  content: description,
});

export const HEAD_METADATA = {
  HOME: createHeadMetaData(
    "Home page",
    "There is a list of all apps you can find here"
  ),
  QUIZ: createHeadMetaData("Quiz", "This quiz will eat all your free time"),
  QUOTES: createHeadMetaData(
    "Quotes",
    "This page can inspire you with great quotes"
  ),
  BAND_NAMES: createHeadMetaData(
    "Rock Band Name",
    "This page helps you to create the best Sad Rock Band Name"
  ),
  COUNTER: createHeadMetaData(
    "Counter",
    "This page helps you to count anything"
  ),
  TODO: createHeadMetaData(
    "Todo",
    "This todo app helps you to track your tasks"
  ),
};
