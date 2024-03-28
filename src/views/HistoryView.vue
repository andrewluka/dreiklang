<script setup lang="ts">
import { fetchWorkWithComposerInfo, type WorkWithComposerInfo } from "@/services/FetchDetails";
import { getViewedWorkIds, clearHistory } from "@/services/ViewingHistory";
import PaginatedWorkGrid from "@/components/PaginatedWorkGrid.vue";
import { ref, onBeforeMount, computed } from "vue";
import TitleWithButton from "@/components/TitleWithButton.vue";

const viewedWorks = ref<WorkWithComposerInfo[]>();

onBeforeMount(async () => {
  const ids = getViewedWorkIds();

  viewedWorks.value = await Promise.all(ids.map((id) => fetchWorkWithComposerInfo(id)));
});

const isLoading = computed(() => !Array.isArray(viewedWorks.value));

const emptyHistory = () => {
  clearHistory();
  viewedWorks.value = [];
};
</script>

<template>
  <TitleWithButton title="History" button-text="Emtpy History" @button-click="emptyHistory" />
  <PaginatedWorkGrid v-if="!isLoading && viewedWorks?.length" :works="viewedWorks" />
  <span v-else-if="isLoading" class="center">Loading...</span>
  <span v-else class="center">History empty</span>
</template>

<style></style>
