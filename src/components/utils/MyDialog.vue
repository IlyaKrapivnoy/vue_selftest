<template>
  <div
    v-if="show"
    @click="hideDialog"
    class="fixed top-0 bottom-0 left-0 right-0 flex bg-black bg-opacity-50"
  >
    <div
      @click.stop
      class="m-auto bg-white min-w-[300px] min-h-[50px] rounded-lg p-6"
    >
      <h2>Add new post</h2>
      <slot />
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: "my-dialog",
  mixins: [toggleMixin],
};
</script>
