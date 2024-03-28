<script setup lang="ts">
const props = defineProps<{
  currentPageMinusOne: number;
  numOfPagesMinusOne: number;
}>();

const emit = defineEmits<{
  pageChange: [newPageNumberMinusOne: number];
}>();

const goTo = (page: number) =>
  page >= 0 && page <= props.numOfPagesMinusOne && emit("pageChange", page);
</script>

<template>
  <div :class="$style.controlsWrapper">
    <button
      :class="['free-floating-button', props.currentPageMinusOne === 0 ? 'disabled' : 'enabled']"
      @click="goTo(props.currentPageMinusOne - 1)"
    >
      {{ "<" }}
    </button>

    <button
      @click="goTo(0)"
      :class="['free-floating-button']"
      v-show="props.currentPageMinusOne > 1"
    >
      1
    </button>
    <span v-show="props.currentPageMinusOne > 2">..</span>

    <button
      @click="goTo(props.currentPageMinusOne - 1)"
      :class="['free-floating-button']"
      v-show="props.currentPageMinusOne >= 1"
    >
      {{ currentPageMinusOne }}
    </button>
    <button :class="['free-floating-button', $style.active]">
      {{ props.currentPageMinusOne + 1 }}
    </button>
    <button
      @click="goTo(props.currentPageMinusOne + 1)"
      :class="['free-floating-button']"
      v-show="props.currentPageMinusOne < props.numOfPagesMinusOne - 1"
    >
      {{ props.currentPageMinusOne + 2 }}
    </button>

    <span v-show="props.currentPageMinusOne < props.numOfPagesMinusOne - 2">..</span>

    <button
      @click="goTo(props.numOfPagesMinusOne)"
      :class="['free-floating-button']"
      v-show="props.currentPageMinusOne < props.numOfPagesMinusOne"
    >
      {{ props.numOfPagesMinusOne + 1 }}
    </button>

    <button
      :class="[
        'free-floating-button',
        props.currentPageMinusOne === props.numOfPagesMinusOne ? 'disabled' : 'enabled',
      ]"
      @click="goTo(props.currentPageMinusOne + 1)"
    >
      {{ ">" }}
    </button>
  </div>
</template>

<style module>
.controlsWrapper {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 25px;
  padding: 20px;
}

.active {
  color: var(--primary-color);
  text-shadow: 0px 0px 2px var(--primary-color);
}
</style>
