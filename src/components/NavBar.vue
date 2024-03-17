<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

/* nav a.router-link-exact-active {
  color: var(--color-text);
} */

/* nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;

    min-width: 20vw;
    max-width: 200px;

    padding: 1rem 0;
    margin-top: 1rem;

    display: flex;
    flex-direction: column;
  }
}
</style>
