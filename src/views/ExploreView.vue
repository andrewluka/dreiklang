<script setup lang="ts">
import WorkPanel from "@/components/WorksPanel.vue";
import SearchBox from "@/components/SearchBox.vue";
import { fetchRandomWorks, type WorkWithComposerInfo } from "@/services/FetchDetails";
import { onBeforeMount, ref } from "vue";

const works = ref<WorkWithComposerInfo[]>([]);

onBeforeMount(async () => {
  works.value = await fetchRandomWorks();
});
</script>

<template>
  <SearchBox placeholder="lolol"></SearchBox>
  <br />
  <!-- <div :class="$style.about"></div> -->
  <WorkPanel heading="Recommendations" url-to-show-more="/" :works="works" />
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
