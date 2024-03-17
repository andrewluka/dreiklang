<script setup lang="ts">
import { computed, type ComputedRef } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps<{
  to: string;
}>();

/**
 *
 * removes beginning and trailing slashes
 *
 */
const formatRoute = (str: string) => {
  if (str.length == 0) return "";
  if (str[0] === "/") str = str.slice(1);
  if (str[str.length - 1] === "/") str = str.slice(0, str.length - 1);

  return str;
};

// nice fp, too slow
// const removeTrailingAndBeginningSlashes = (str: string) => str.split('/').filter(Boolean).join('/')

const route = useRoute();
const className: ComputedRef<string> = computed(() => {
  const routeName = formatRoute(route.name?.toString() || "");
  const propTo = formatRoute(props.to);

  // special case: "/" aka home
  if (routeName === "home") return propTo === "" ? "active" : "inactive";

  return propTo === routeName ? "active" : "inactive";
});
</script>

<template>
  <RouterLink v-bind:to="props.to" :class="className"><slot></slot></RouterLink>
</template>

<style scoped>
/* TODO: an actually nice style */
a {
  padding: 7px 30px;
}

a,
.green {
  text-decoration: none;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.active {
  text-shadow: var(--vt-c-text-light-2) 1px 0 10px;
  color: hsla(160, 100%, 37%, 1);
  background-color: hsla(160, 100%, 37%, 0.1);
  /* font-weight: 500; */
  /* color: yellow; */
}

.inactive {
  text-shadow: none;
  color: hsla(160, 100%, 37%, 0.7);
  background-color: transparent;
  /* font-weight: 400; */
  /* color: blue; */
}
</style>
