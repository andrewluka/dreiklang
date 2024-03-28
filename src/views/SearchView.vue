<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchWorks } from "@/services/FetchDetails";
import type { WorkInfo } from "@/services/FetchDetails";
import type { ComposerInfo } from "@/services/FetchDetails";
import PaginatedWorkScroller from "@/components/PaginatedWorkScroller.vue";
import SearchBox from "@/components/SearchBox.vue";

const route = useRoute();
const query = route.query.q;
const page = Number(route.query.p) || 0;

const router = useRouter();

const works = ref<(WorkInfo & { composer: ComposerInfo })[]>();

watch(
  () => route.query,
  async ({ q: query, p: page }) => {
    delete works.value;
    works.value = await searchWorks(String(query), Number(page) || 0);
  }
);

onBeforeMount(async () => {
  works.value = await searchWorks(String(query), page);
});

const onSubmit = (query: string) => {
  router.push(`/search?q=${query}`);
  works.value = works.value?.map((e) => e);
};
</script>

<template>
  <SearchBox @submit="onSubmit" :start-value="(query && String(query)) || ''" />
  <PaginatedWorkScroller
    v-if="works"
    :works="
      works.map(({ composer, work }) => ({
        workInfo: { work, composer },
        composerInfo: composer,
      }))
    "
  />
  <span class="center" v-else>Loading...</span>
</template>
