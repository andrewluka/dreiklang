<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

defineProps<{
  to: string
}>()

const route = useRoute()
const currentRouteName = computed(() => (console.log(route.name) as any) || route.name)
</script>

<template>
  <RouterLink v-bind:to="to"><slot></slot></RouterLink>
</template>

<style scoped>
a {
  padding: 7px 30px;
}
</style>
