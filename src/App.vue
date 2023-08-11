<template>
  <div class="min-h-[calc(100vh-106px)]">
    <my-navigation />
    <router-view />
  </div>
  <my-footer />
</template>

<script>
import MyFooter from "@/components/layout/MainFooter.vue";
import MyNavigation from "@/components/layout/MainHeader.vue";

export default {
  components: { MyNavigation, MyFooter },
};
</script>
