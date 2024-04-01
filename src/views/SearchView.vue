<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchWorks } from "@/services/FetchDetails";
import type { SearchResult } from "@/services/FetchDetails";
import WorkScroller from "@/components/WorkScroller.vue";
import SearchBox from "@/components/SearchBox.vue";

const route = useRoute();
const query = computed(() => route.query.q);
const page = computed(() => Number(route.query.p) || 0);

const router = useRouter();

const searchResult = ref<SearchResult | "none">();

watch(
  () => route.query,
  async ({ q: query, p: page }) => {
    searchResult.value = await searchWorks(String(query), Number(page) || 0);
  }
);

onBeforeMount(async () => {
  searchResult.value = await searchWorks(String(query.value), page.value);
});

const onSubmit = (query: string) => {
  router.push(`/search?q=${query}`);
};

const isThereNextPage = computed(
  () => searchResult.value && searchResult.value !== "none" && searchResult.value.next > 0
);

const goToNextPage = () =>
  isThereNextPage.value && router.push(`/search?q=${query.value}&p=${page.value + 1}`);

const goToPrevPage = () =>
  page.value > 0 && router.push(`/search?q=${query.value}&p=${page.value - 1}`);
</script>

<template>
  <SearchBox @submit="onSubmit" :start-value="(query && String(query)) || ''" />
  <WorkScroller
    v-if="searchResult && searchResult !== 'none'"
    :works="
      searchResult.results.map(({ composer, work }) => ({
        workInfo: { work, composer },
        composerInfo: composer,
      }))
    "
  />
  <span class="center" v-else-if="searchResult === 'none'"> Nothing found</span>
  <span class="center" v-else>Loading...</span>
  <div :class="$style.controlsWrapper">
    <button
      :class="['free-floating-button', $style.button, page > 0 ? 'enabled' : 'disabled']"
      @click="goToPrevPage"
    >
      {{ "<" }}
    </button>
    <span :class="$style.button">{{ page + 1 }}</span>
    <button
      :class="['free-floating-button', $style.button, isThereNextPage ? 'enabled' : 'disabled']"
      @click="goToNextPage"
    >
      {{ ">" }}
    </button>
  </div>
</template>

<style module>
.controlsWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
}

.button {
  margin: 0 40px;
  font-weight: bolder;
  font-size: large;
}

.button:hover {
  .enabled {
    color: var(--primary-color);
    text-shadow: 0 0 20px var(--primary-color);
  }
}
</style>
