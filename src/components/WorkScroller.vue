<script setup lang="ts">
import WorkCard from "@/components/WorkCard.vue";
import type { WorkWithComposerInfo } from "@/services/FetchDetails";

const props = defineProps<{
  works: WorkWithComposerInfo[];
}>();
</script>

<template>
  <div :class="$style.wrapper">
    <WorkCard
      v-for="work in props.works"
      :work-with-composer-info="work"
      :key="work.workInfo.work.id"
    />
  </div>
</template>

<style module>
.wrapper {
  padding-top: 20px;
  display: flex;
  flex-grow: 2;
  /* overflow: auto; */
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 20px;
  row-gap: 20px;
  align-items: center;
  justify-content: center;
}
</style>
