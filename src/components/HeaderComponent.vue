<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import NavBarItem from "@/components/NavBarItem.vue";
import LogoDreiKlang from "@/components/LogoDreiKlang.vue";
</script>

<template>
  <header>
    <LogoDreiKlang />

    <NavBar>
      <NavBarItem to="/">Home</NavBarItem>
      <NavBarItem to="/explore">Explore</NavBarItem>
    </NavBar>

    <NavBar>
      <NavBarItem to="/history">History</NavBarItem>
    </NavBar>
  </header>
</template>

<style module>
/* @media (min-width: 1024px) { */
header {
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  place-items: center;
  align-items: center;
  padding: 0;
  border-right: var(--border-size) solid var(--border-color);
  /* box-shadow: 1px 0px 5px var(--border-color); */
}
/* } */
</style>
