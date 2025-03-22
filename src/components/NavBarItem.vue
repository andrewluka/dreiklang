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
const className: ComputedRef<"active" | "inactive"> = computed(() => {
  const routeName = formatRoute(route.path || "");
  const propTo = formatRoute(props.to);

  return propTo === routeName ? "active" : "inactive";
});

const loseFocus = () => {
  if (document.activeElement) {
    (document.activeElement as any).blur();
  }
}
</script>

<template>
  <RouterLink v-bind:to="props.to" :class="className" @click="loseFocus"><slot></slot></RouterLink>
</template>

<style scoped>
a {
  padding: 7px 30px;
  font-weight: 900;
}

a {
  text-decoration: none;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: var(--primary-color-hover);
  }
}

.active {
  text-shadow: var(--border-color-hover) 1px 0 10px;
  color: var(--primary-color);
  opacity: 1;
  background-color: var(--primary-color-focus);
}

.inactive {
  text-shadow: none;
  color: var(--primary-color);
  opacity: 0.7;
  background-color: transparent;
}

@media (min-width: 1024px) {
  a {
    font-weight: normal;
  }
}
</style>
