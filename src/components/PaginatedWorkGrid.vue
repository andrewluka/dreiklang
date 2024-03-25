<script setup lang="ts">
import type { WorkWithComposerInfo } from "@/services/FetchDetails";
import WorkCard, { WORK_CARD_HEIGHT, WORK_CARD_WIDTH } from "@/components/WorkCard.vue";
import { computed, onMounted, ref } from "vue";
import { useChildDimensions } from "@/hooks/useChildDimensions";

const props = defineProps<{
  works: WorkWithComposerInfo[];
}>();

const wrapper = ref<HTMLDivElement>();
const wrapperDimensions = useChildDimensions(wrapper);

const maxWorksPerPage = ref(0);
const currentPage = ref(0);

onMounted(() => {
  const wrapperWidth = wrapperDimensions.value.clientWidth || 0;
  const wrapperHeight = wrapperDimensions.value.clientHeight || 0;

  const worksPerRow = Math.floor(wrapperWidth / (WORK_CARD_WIDTH + 20));
  const worksPerColumn = Math.floor(wrapperHeight / (WORK_CARD_HEIGHT + 20));

  maxWorksPerPage.value = worksPerRow * worksPerColumn || 1;
});

const numOfPagesMinusOne = computed(() => {
  const n = Math.ceil(props.works.length / maxWorksPerPage.value) - 1;
  return n < 0 ? 0 : n;
});

const worksToDisplay = computed(() =>
  props.works.slice(
    maxWorksPerPage.value * currentPage.value,
    maxWorksPerPage.value * currentPage.value + maxWorksPerPage.value
  )
);

const goToNextPage = () => {
  const nextPage = Math.min(numOfPagesMinusOne.value, currentPage.value + 1);
  currentPage.value = nextPage;
};

const goToPrevPage = () => {
  const prevPage = Math.max(0, currentPage.value - 1);
  currentPage.value = prevPage;
};
</script>

<template>
  <div ref="wrapper" :class="$style.contentWrapper">
    <WorkCard
      v-for="work in worksToDisplay"
      :work-with-composer-info="work"
      :key="work.workInfo.work.id"
    />
  </div>

  <div :class="$style.controlsWrapper">
    <span
      :class="[$style.control, currentPage === 0 ? $style.disabled : $style.enabled]"
      @click="goToPrevPage"
      >{{ "<" }}</span
    >

    <!-- we add this because of a bug in vue -->
    <span v-if="!Number.isFinite(numOfPagesMinusOne)">none</span>
    <span
      v-else
      :class="[$style.control, index - 1 === currentPage && $style.active]"
      v-for="index in numOfPagesMinusOne + 1"
      @click="currentPage = index - 1"
      :key="index"
    >
      {{ index }}
    </span>

    <span
      :class="[
        $style.control,
        currentPage === numOfPagesMinusOne ? $style.disabled : $style.enabled,
      ]"
      @click="goToNextPage"
      >{{ ">" }}</span
    >
  </div>
</template>

<style module>
.contentWrapper {
  flex-grow: 5;
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;

  align-items: center;
  justify-content: center;
}

.controlsWrapper {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 25px;
}

.control {
  /* padding: 10px; */
  transition: all 0.4s;
  cursor: pointer;
}

.enabled {
  opacity: 1;
}

.disabled {
  opacity: 0.5;
  cursor: default;
}

.active {
  color: var(--primary-color);
  text-shadow: 0px 0px 2px var(--primary-color);
}
</style>
