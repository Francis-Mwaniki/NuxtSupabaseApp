<template>
  <div class="overflow-hidden">
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
};
</script>
