<template>
  <div class="">
    <NuxtPage />
    <FootVue />
  </div>
</template>
<script>
import FootVue from "./components/Foot.vue";
export default {
  components: {
    FootVue,
  },

  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>
