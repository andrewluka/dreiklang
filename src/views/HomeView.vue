<script setup lang="ts">
import WorksPanel from "@/components/WorksPanel.vue";
import { fetchWorkWithComposerInfo, type WorkWithComposerInfo } from "@/services/FetchDetails";
import { getViewedWorkIds } from "@/services/ViewingHistory";
import { onBeforeMount, ref } from "vue";

const works = ref<WorkWithComposerInfo[]>();

onBeforeMount(async () => {
  // first n works
  const n = 10;
  const workIds = getViewedWorkIds().slice(0, n);

  works.value = await Promise.all(workIds.map((id) => fetchWorkWithComposerInfo(id)));
});
</script>

<template>
  <div :class="$style.wrapper">
    <!-- <h1 :class="$style.title">Recently Viewed Works</h1> -->
    <WorksPanel
      v-if="works"
      heading="Recently Viewed Works"
      url-to-show-more="/history"
      :works="works"
    />
    <span v-else class="center">Loading...</span>
  </div>
</template>

<style module>
.title {
  margin-bottom: 15px;
}

.wrapper {
  flex-grow: 1;
  /* margin: 30px; */
}
</style>
