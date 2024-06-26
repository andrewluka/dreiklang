<script setup lang="ts">
import WorkCard, { WORK_CARD_WIDTH } from "@/components/WorkCard.vue";
import { useChildDimensions } from "@/hooks/useChildDimensions";
import type { WorkWithComposerInfo } from "@/services/FetchDetails";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const cardwidthwithcolumngap = WORK_CARD_WIDTH; // px

const wrapper = ref<HTMLDivElement>();

const wrapperDimensions = useChildDimensions(wrapper);

const props = defineProps<{
  works: WorkWithComposerInfo[];
  heading: string;
  urlToShowMore?: string;
}>();

const numberOfDisplayableElements = computed(() => {
  const value =
    (wrapperDimensions.value.clientWidth || 0) < 500
      ? (wrapperDimensions.value.clientHeight && wrapperDimensions.value.clientHeight - 200) || 0
      : wrapperDimensions.value.clientWidth || 0;
  const wrapperWidthMinusShowMoreLink = (value || 30) - 30 || 0;

  return Math.floor(wrapperWidthMinusShowMoreLink / cardwidthwithcolumngap) || 1;
});

const shouldShowMore = computed(() => {
  return !!props.urlToShowMore && numberOfDisplayableElements.value < props.works.length;
});

const filteredWorks = computed(() => {
  const numDisplayable = shouldShowMore.value
    ? numberOfDisplayableElements.value - 1 || 1
    : numberOfDisplayableElements.value;

  return props.works.slice(0, numDisplayable);
});

const router = useRouter();
const go = () => props.urlToShowMore && router.push(props.urlToShowMore);
</script>

<template>
  <h2>{{ props.heading }}</h2>

  <div ref="wrapper" :class="$style.contentWrapper" v-if="props.works.length">
    <WorkCard
      v-for="work in filteredWorks"
      :work-with-composer-info="work"
      :key="work.workInfo.work.id"
    />
    <div @click="go" :class="[$style.showMore, $style.fadeHoverEffect]">
      <h2>
        Show<br />
        More
      </h2>
    </div>
  </div>
  <div :class="$style.contentWrapper" v-else>
    <span class="center">Empty</span>
  </div>
</template>

<style module>
.showMore {
  min-width: var(--width);
  width: var(--width);
  min-height: calc(var(--width) * var(--height-to-width-ratio));
  height: calc(var(--width) * var(--height-to-width-ratio));

  color: white;
  background-color: black;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: black;
}

.fadeHoverEffect {
  opacity: 0.3;
  transition: all 0.4s;
}

.fadeHoverEffect:hover {
  opacity: 1;
  border: var(--border-size) solid var(--primary-color);
  text-shadow: white 0px 0 2px;
  cursor: pointer;
}

.contentWrapper {
  display: flex;
  flex-direction: column;

  padding: 15px 0;
  column-gap: 20px;
  row-gap: 20px;
  border-left-width: 0;
  border-right-width: 0;

  overflow-x: scroll;
  overflow-y: hidden;

  scrollbar-width: thin;
  scrollbar-width: none;
  height: 1024px;
}

@media (min-width: 500px) {
  .contentWrapper {
    flex-direction: row;
    height: auto;
  }
}
</style>
