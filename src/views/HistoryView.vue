<script setup lang="ts">
import { fetchWorkWithComposerInfo, type WorkWithComposerInfo } from "@/services/FetchDetails";
import { getViewedWorkIds } from "@/services/ViewingHistory";
import PaginatedWorkGrid from "@/components/PaginatedWorkGrid.vue";
import { ref, onBeforeMount } from "vue";

const viewedWorks = ref<WorkWithComposerInfo[]>([]);

onBeforeMount(async () => {
  const ids = getViewedWorkIds();

  viewedWorks.value = await Promise.all(ids.map((id) => fetchWorkWithComposerInfo(id)));
});
</script>

<template>
  <PaginatedWorkGrid v-if="viewedWorks.length" :works="viewedWorks"></PaginatedWorkGrid>
  <span v-else>History empty</span>
  <!-- <WorkCard
    v-for="work in viewedWorks"
    :work-with-composer-info="work"
    :key="work.workInfo.work.id"
  /> -->
</template>
