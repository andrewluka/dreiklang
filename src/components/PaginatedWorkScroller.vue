<script setup lang="ts">
import type { WorkWithComposerInfo } from "@/services/FetchDetails";
import WorkCard, { WORK_CARD_HEIGHT, WORK_CARD_WIDTH } from "@/components/WorkCard.vue";
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

const goToNextPage = () => {
  const nextPage = Math.min(numOfPagesMinusOne.value, currentPageMinusOne.value + 1);
  currentPageMinusOne.value = nextPage;
};

const goToPrevPage = () => {
  const prevPage = Math.max(0, currentPageMinusOne.value - 1);
  currentPageMinusOne.value = prevPage;
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

  <div :class="$style.controlsWrapper">
    <button
      :class="[
        'free-floating-button',
        currentPageMinusOne === 0 ? $style.disabled : $style.enabled,
      ]"
      @click="goToPrevPage"
    >
      {{ "<" }}
    </button>

    <button
      @click="currentPageMinusOne = 0"
      :class="['free-floating-button']"
      v-show="currentPageMinusOne > 1"
    >
      1
    </button>
    <span v-show="currentPageMinusOne > 2">..</span>

    <button
      @click="goToPrevPage"
      :class="['free-floating-button']"
      v-show="currentPageMinusOne >= 1"
    >
      {{ currentPageMinusOne }}
    </button>
    <button :class="['free-floating-button', $style.active]">{{ currentPageMinusOne + 1 }}</button>
    <button
      @click="goToNextPage"
      :class="['free-floating-button']"
      v-show="currentPageMinusOne < numOfPagesMinusOne - 1"
    >
      {{ currentPageMinusOne + 2 }}
    </button>

    <span v-show="currentPageMinusOne < numOfPagesMinusOne - 2">..</span>

    <button
      @click="currentPageMinusOne = numOfPagesMinusOne"
      :class="['free-floating-button']"
      v-show="currentPageMinusOne < numOfPagesMinusOne"
    >
      {{ numOfPagesMinusOne + 1 }}
    </button>

    <!-- <button
      v-else
      :class="['free-floating-button', index - 1 === currentPage && $style.active]"
      v-for="index in numOfPagesMinusOne + 1"
      @click="currentPage = index - 1"
      :key="index"
    >
      {{ index }}
    </button> -->

    <button
      :class="[
        'free-floating-button',
        currentPageMinusOne === numOfPagesMinusOne ? $style.disabled : $style.enabled,
      ]"
      @click="goToNextPage"
    >
      {{ ">" }}
    </button>
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
