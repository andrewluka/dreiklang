<script setup lang="ts">
import type { WorkWithComposerInfo } from "@/services/FetchDetails";
import WorkCard, { WORK_CARD_HEIGHT, WORK_CARD_WIDTH } from "@/components/WorkCard.vue";
import NumberedPaginationControls from "@/components/NumberedPaginationControls.vue";
import { computed, onMounted, ref } from "vue";
import { useChildDimensions } from "@/hooks/useChildDimensions";

const props = defineProps<{
  works: WorkWithComposerInfo[];
}>();

const emit = defineEmits<{
  workCardClicked: [w: WorkWithComposerInfo];
}>();

const wrapper = ref<HTMLDivElement>();
const wrapperDimensions = useChildDimensions(wrapper);

const maxWorksPerPage = ref(0);
const currentPageMinusOne = ref(0);

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
    maxWorksPerPage.value * currentPageMinusOne.value,
    maxWorksPerPage.value * currentPageMinusOne.value + maxWorksPerPage.value
  )
);

const goToPage = (page: number) => {
  console.log(page);
  currentPageMinusOne.value = page;
};
</script>

<template>
  <div v-if="props.works.length" ref="wrapper" :class="$style.contentWrapper">
    <WorkCard
      v-for="work in worksToDisplay"
      :work-with-composer-info="work"
      :key="work.workInfo.work.id"
      @before-redirect="(w) => emit('workCardClicked', w)"
    />
  </div>
  <span class="center" v-else>empty</span>

  <NumberedPaginationControls
    :current-page-minus-one="currentPageMinusOne"
    :num-of-pages-minus-one="numOfPagesMinusOne"
    @page-change="goToPage"
  />
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
  padding: 20px;
}
</style>
