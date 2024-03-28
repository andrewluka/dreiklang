<script setup lang="ts">
const emit = defineEmits<{
  buttonClick: [];
}>();

const props = defineProps<{
  title: string;
  buttonText: string;
}>();

const onClick = () => emit("buttonClick");
</script>

<template>
  <div :class="$style.titleWrapper">
    <h2>{{ props.title }}</h2>
    <button @click="onClick" class="free-floating-button">{{ props.buttonText }}</button>
  </div>
</template>

<style module>
.titleWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
