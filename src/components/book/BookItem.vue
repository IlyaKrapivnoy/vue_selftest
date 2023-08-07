<template>
  <div
    class="border-2 border-orange-500 p-2 px-4 mt-5 flex justify-between items-center"
  >
    <div>
      <p>
        <strong>Book Title:</strong>
        {{ displayBookTitle }}
      </p>
      <p>
        <strong>Author:</strong>
        {{ allAuthors }}
      </p>
    </div>
    <div class="flex flex-col">
      <button @click="removeBook">x</button>
      <button @click="handleOpenSingleBookPage">Open</button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit, router }) {
    const displayBookTitle = computed(
      () => props.book?.volumeInfo?.title || props.book?.title || "No title"
    );

    const allAuthors = computed(
      () =>
        props.book?.volumeInfo?.authors?.join(", ") ||
        props.book?.author ||
        "Unknown Author"
    );

    const removeBook = () => {
      emit("removeBook", props.book);
    };

    const handleOpenSingleBookPage = () => {
      const bookTitle = props.book?.title || props.book?.volumeInfo?.title;
      if (bookTitle) {
        router.push(`/bookshelf/${bookTitle}`);
      }
    };

    return {
      displayBookTitle,
      allAuthors,
      removeBook,
      handleOpenSingleBookPage,
    };
  },
});
</script>
