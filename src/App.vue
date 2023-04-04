<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>
<script>
import AppHeader from "@/components/Base/AppHeader.vue";
export default {
  components: { AppHeader },
  name: "AppDefault",
};
</script>
