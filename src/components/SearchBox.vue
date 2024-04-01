<script setup lang="ts">
import { sanitize } from "@/services/utils";
import { ref } from "vue";

const props = defineProps<{
  placeholder?: string;
  startValue?: string;
}>();

const value = ref<string>(props.startValue || "");

const emit = defineEmits<{
  // <eventName>: <expected arguments>
  submit: [value: string]; // named tuple syntax
}>();

const onSubmit = (e: Event) => {
  e.preventDefault();
  if (!value.value) return;

  emit("submit", sanitize(value.value));
};
</script>

<template>
  <form :class="$style.form">
    <input :class="$style.input" type="text" :placeholder="props.placeholder" v-model="value" />
    <button
      v-on:keyup.enter="onSubmit"
      @click="onSubmit"
      :class="[$style.button, 'free-floating-button']"
    >
      Go
    </button>
  </form>
</template>

<style module>
.form {
  height: 2.25rem;
  /* margin-bottom: 20px; */
  background-color: var(--background-color-mute);
  border: var(--border-size) solid var(--border-color);
  transition: all 0.4s;
  padding: 0.5rem 1rem;

  border-radius: 100px;
  outline-style: solid;

  outline-offset: 2px;
  outline-color: rgba(0, 0, 0);
  outline-width: 0;
  display: flex;
  align-items: center;
  justify-content: stretch;
}

.input {
  outline: none;
  background-color: transparent;
  border: none;
  flex-grow: 2;
  font-family: var(--font-family);
  color: var(--text-color);
}

.button {
  opacity: 0.7;
}

.button:hover {
  opacity: 1;
}

.form:focus-within {
  outline-width: 1px;
  outline-color: var(--primary-color);
}

@media (max-width: 1023px) {
  .form {
    z-index: -1;

    position: fixed;
    top: 15px;
    left: 65px;
    width: calc(100% - 100px);
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
