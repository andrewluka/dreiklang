<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <HeaderComponent />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style module>
main {
  --margin: 40px;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin: var(--margin);
  max-width: calc(80vw - 2.25 * var(--margin));
}

/* @media (min-width: 1024px) { */
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
/* } */
</style>
