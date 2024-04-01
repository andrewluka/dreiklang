<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  document.onvisibilitychange = () => {
    if (document.visibilityState === "hidden") {
      sessionStorage.clear();
    }
  };
});
</script>

<template>
  <div :class="$style.wrapper">
    <HeaderComponent />

    <main :class="$style.main">
      <RouterView />
    </main>
  </div>
</template>

<style module>
.main {
  /* position: fixed; */
  position: fixed;
  top: 65px;
  width: 100%;
  height: calc(100% - 65px);
  overflow: auto;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 0 40px;
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

@media (min-width: 1024px) {
  .main {
    position: fixed;
    top: 0px;
    left: 200px;
    width: calc(100% - 200px);
    min-height: 100%;
    padding: 40px;
  }
}
</style>
