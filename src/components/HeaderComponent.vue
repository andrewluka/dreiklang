<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import NavBarItem from "@/components/NavBarItem.vue";
import LogoDreiKlang from "@/components/LogoDreiKlang.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
</script>

<template>
  <header :class="$style.header">
    <div :class="$style.darken"></div>

    <div :class="$style.logoWrapper">
      <button :class="['free-floating-button', $style.menuButton]">
        <MenuIcon />
      </button>
      <LogoDreiKlang />
    </div>

    <div :class="$style.navBarWrapper">
      <NavBar>
        <NavBarItem to="/">Home</NavBarItem>
        <NavBarItem to="/explore">Explore</NavBarItem>
      </NavBar>

      <NavBar>
        <NavBarItem to="/history">History</NavBarItem>
      </NavBar>
    </div>
  </header>
</template>

<style module>
.menuButton {
  opacity: 0.8;
  /* z-index: 10; */
}

.menuButton:hover {
  opacity: 1;
  /* box-shadow: 0 0 100px var(--primary-color); */
}

.logoWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px;
  width: 100%;

  column-gap: 20px;
  height: 65px;
}

.darken {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
}

@media (max-width: 1023px) {
  .header:focus-within {
    /* color: aqua !important; */
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    height: 100%;
    background: var(--border-color);
    z-index: 3;

    & .darken {
      background-color: rgba(0, 0, 0, 0.8);
    }

    & .navBarWrapper {
      width: 100%;
      opacity: 1;
      z-index: 3;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      /* justify-content: space-evenly; */
    }

    /* width: 100vw; */
    /* height: 65px; */

    /* .navBarWrapper * {
    display: flex;
  } */
  }
}

.navBarWrapper {
  transition: all 0.4s;
  /* display: none; */
  width: 0;
  opacity: 0;
  z-index: -1;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 65px;
  /* border: var(--border-size) solid var(--border-color); */
}

@media (min-width: 1024px) {
  .header {
    width: 200px;
    height: 100%;

    /* min-width: 20vw; */
    display: flex;
    flex-direction: column;
    place-items: center;
    align-items: center;
    padding: 0;
    border-right: var(--border-size) solid var(--border-color);
    /* box-shadow: 1px 0px 5px var(--border-color); */
  }

  .menuButton {
    display: none;
  }

  .logoWrapper {
    justify-content: center;
  }

  .navBarWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    width: 100%;
    opacity: 1;
    z-index: 3;

    /* justify-content: space-evenly; */
  }
}

/* @media (max-width: 1023px) {
  .header {
    display: none;
  }
} */
</style>
