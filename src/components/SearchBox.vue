<script setup lang="ts">
import { ref } from "vue";

const value = ref<string | null>(null);

const props = defineProps<{
  placeholder?: string;
}>();

const onInput = (e: InputEvent) => {
  value.value = (e.target as any).value;
};
</script>

<template>
  <input
    :class="$style.input"
    type="text"
    :placeholder="props.placeholder"
    :value="value"
    :oninput="onInput"
  />
</template>

<style module>
.input {
  height: 2.25rem;
  background-color: var(--background-color-mute);
  border: var(--border-size) solid var(--border-color);
  transition: all 0.4s;
  padding: 0.5rem;
  color: var(--text-color);
  border-radius: 100px;
  outline-style: solid;

  outline-offset: 2px;
  outline-color: rgba(0, 0, 0);
  outline-width: 0;
}

.input:focus {
  outline-width: 1px;
  outline-color: var(--primary-color);
  /* outline-offset: 2px;
  outline-width: 2px; */
  /* outline-color: var(--outline-color); */
  /* border-color: transparent; */
}
</style>
