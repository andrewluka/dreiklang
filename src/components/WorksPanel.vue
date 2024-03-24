<script setup lang="ts">
import WorkCard, { WORK_CARD_WIDTH, type WorkCardProps } from "@/components/WorkCard.vue";
import { ref, computed, type Ref, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const cardwidthwithcolumngap = WORK_CARD_WIDTH; // px
const showMoreLinkWidth = WORK_CARD_WIDTH * (3 / 4);

const wrapper: Ref<HTMLDivElement | null> = ref(null);
const wrapperWidthMinusShowMoreLink = ref(0);

function callback() {
  wrapperWidthMinusShowMoreLink.value =
    (wrapper.value?.clientWidth || 0) - showMoreLinkWidth || wrapperWidthMinusShowMoreLink.value;

  if (wrapperWidthMinusShowMoreLink.value < 0) wrapperWidthMinusShowMoreLink.value = 0;
}

onBeforeMount(() => window.addEventListener("resize", callback));
onMounted(() => callback());
onBeforeUnmount(() => window.removeEventListener("resize", callback));

const props = defineProps<{
  works: WorkCardProps[];
  heading: string;
  urlToShowMore?: string;
}>();

const filteredWorks = computed(() => {
  const numberOfDisplayableElements =
    Math.floor(wrapperWidthMinusShowMoreLink.value / cardwidthwithcolumngap) || 1;

  return props.works.slice(0, Math.min(numberOfDisplayableElements, props.works.length));
});

const router = useRouter();
const go = () => props.urlToShowMore && router.push(props.urlToShowMore);
</script>

<template>
  <h2>{{ props.heading }}</h2>

  <div ref="wrapper" :class="$style.contentWrapper">
    <WorkCard
      v-for="work in filteredWorks"
      :key="work.workId"
      :composer="work.composer"
      :composer-portrait="work.composerPortrait"
      :work-id="work.workId"
      :title="work.title"
    />
    <div
      v-if="props.urlToShowMore && filteredWorks.length < works.length"
      @click="go"
      :class="[$style.showMore, $style.fadeHoverEffect]"
    >
      <h2>
        Show<br />
        More
      </h2>
    </div>
  </div>
</template>

<style module>
.showMore {
  width: 150px;
  color: white;
  background-color: black;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fadeHoverEffect {
  opacity: 0.3;
  transition: all 0.4s;
}

.fadeHoverEffect:hover {
  opacity: 1;
  text-shadow: white 0px 0 2px;
  cursor: pointer;
}

.contentWrapper {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */

  padding: 15px 0;
  column-gap: 20px;
  /* border: var(--border-size) solid var(--border-color); */
  border-left-width: 0;
  border-right-width: 0;

  overflow-x: scroll;
  overflow-y: hidden;

  scrollbar-width: thin;
  scrollbar-width: none;
  /* box-shadow: -10px 0px 0px 5px black; */

  /* scroll-padding: 50%; */
  /* box-shadow:
    inset 5px 0px 5px -5px rgba(0, 0, 0, 0.8),
    inset -5px 0px 5px -5px rgba(0, 0, 0, 0.8); */
  /* max-width: 70vw; */
}
</style>
