<script setup lang="ts">
import NavBar from "./NavBar.vue";
import NavBarItem from "./NavBarItem.vue";
import LogoDreiKlang from "./LogoDreiKlang.vue";
</script>

<template>
  <header>
    <LogoDreiKlang />
    <!-- <div > -->
    <NavBar>
      <NavBarItem to="/">Home</NavBarItem>
      <NavBarItem to="/about">Explore</NavBarItem>
    </NavBar>
    <!-- <HelloWorld msg="You  it!" /> -->
    <!-- </div> -->
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh; */
}

@media (min-width: 1024px) {
  header {
    min-width: 20vw;
    display: flex;
    flex-direction: column;
    place-items: center;
    align-items: center;
    padding: 0;
    /* border-right: 1px solid rgba(245, 245, 220, 0.5); */
    box-shadow: 1px 0px 5px var(--vt-c-divider-light-1);
  }
}
</style>
