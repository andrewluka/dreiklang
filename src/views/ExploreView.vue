<script setup lang="ts">
import PaginatedWorkGrid from "@/components/PaginatedWorkGrid.vue";
import TitleWithButton from "@/components/TitleWithButton.vue";
import SearchBox from "@/components/SearchBox.vue";
import { fetchRandomWorks, type WorkWithComposerInfo } from "@/services/FetchDetails";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const works = ref<WorkWithComposerInfo[]>([]);
const EXPLORE_CACHE_KEY = "explore_cache";

onBeforeMount(async () => {
  const cache = sessionStorage.getItem(EXPLORE_CACHE_KEY);

  if (cache) works.value = JSON.parse(cache);
  else {
    works.value = await fetchRandomWorks();
    sessionStorage.setItem(EXPLORE_CACHE_KEY, JSON.stringify(works.value));
  }
});

const renew = async () => {
  works.value = [];
  works.value = await fetchRandomWorks();
  sessionStorage.setItem(EXPLORE_CACHE_KEY, JSON.stringify(works.value));
};

const router = useRouter();

const onSubmit = (query: string) => {
  router.push(`/search?q=${query}`);
};
</script>

<template>
  <SearchBox @submit="onSubmit" placeholder="Search composers, pieces etc."></SearchBox>
  <br />
  <!-- <div :class="$style.about"></div> -->

  <TitleWithButton @button-click="renew" title="Recommendations" button-text="renew" />

  <PaginatedWorkGrid v-if="works.length" :works="works" />
  <span class="center" v-else>loading...</span>
</template>
