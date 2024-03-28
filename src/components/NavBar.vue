<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<style module>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

/* @media (min-width: 1024px) { */
nav {
  text-align: left;
  font-size: 1rem;

  /* min-width: 20vw;
  max-width: 200px; */

  padding: 1rem 0;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
}
/* } */
</style>
