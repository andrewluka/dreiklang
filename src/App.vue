<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <div class="wrapper">
    <HeaderComponent />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh; */
}

main {
  flex-grow: 2;
}

@media (min-width: 1024px) {
  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: stretch;
    width: 100vw;
    padding: 0px;
    margin: 0px;
  }
}
</style>
