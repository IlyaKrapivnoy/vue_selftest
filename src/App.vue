<template>
  <div class="min-h-[calc(100vh-106px)]">
    <my-navigation />
    <router-view />
  </div>
  <my-footer />
</template>

<script>
import MyFooter from "@/components/layout/MyFooter.vue";
import MyNavigation from "@/components/layout/MyNavigation.vue";

export default {
  components: { MyNavigation, MyFooter },
};
</script>
