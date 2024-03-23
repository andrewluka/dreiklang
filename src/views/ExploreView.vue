<script setup lang="ts">
import WorkPanel from "@/components/WorksPanel.vue";
import { fetchRandomWorks, type WorkWithComposerInfo } from "@/services/FetchDetails";
import { onBeforeMount, ref } from "vue";

const works = ref<WorkWithComposerInfo[]>([]);

onBeforeMount(async () => {
  works.value = await fetchRandomWorks();
});
</script>

<template>
  <div :class="$style.about"></div>
  <WorkPanel
    heading=""
    :works="
      works.map((w) => ({
        composer: w.composerInfo.complete_name,
        composerPortrait: w.composerInfo.portrait,
        title: w.workInfo.work.title,
        workId: w.workInfo.work.id,
      }))
    "
  />
</template>

<style module>
/* @media (min-width: 1024px) { */
.about {
  flex-grow: 2;
  height: inherit;
  display: flex;
  /* align-items: center; */
}
/* } */
</style>
