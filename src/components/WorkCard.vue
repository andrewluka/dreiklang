<script setup lang="ts">
import type { WorkWithComposerInfo } from "@/services/FetchDetails";
import { useRouter } from "vue-router";

export interface WorkCardProps {
  // workId: string;
  // title: string;
  // composer: string;
  // // url
  // composerPortrait: string;
  workWithComposerInfo: WorkWithComposerInfo;
}

const props = defineProps<WorkCardProps>();

const emit = defineEmits<{
  beforeRedirect: [w: WorkWithComposerInfo];
}>();

const router = useRouter();
const goToWork = () => {
  emit("beforeRedirect", props.workWithComposerInfo);
  router.push(`/work/${props.workWithComposerInfo.workInfo.work.id}`);
};
</script>

<script lang="ts">
const WORK_CARD_WIDTH = 175;
const WORK_CARD_HEIGHT = WORK_CARD_WIDTH * (4 / 3);
export { WORK_CARD_WIDTH, WORK_CARD_HEIGHT };
</script>

<template>
  <div :class="[$style.wrapper]" @click="goToWork">
    <img :src="props.workWithComposerInfo.composerInfo.portrait" :class="$style.img" />
    <div :class="$style.metadata">
      <p :class="$style.ellipsis">{{ props.workWithComposerInfo.workInfo.work.title }}</p>
      <p :class="[$style.composer, $style.ellipsis]">
        {{ props.workWithComposerInfo.composerInfo.complete_name }}
      </p>
    </div>
  </div>
</template>

<style module>
:root {
  --width: 175px;
  --height-to-width-ratio: 4/3;
}

.metadata {
  margin: 3px 1rem;
  /* margin-top: 3px; */
  line-height: 1.3;
}

.ellipsis {
  /* text-wrap: nowrap; */
  overflow-x: clip;
  overflow-y: visible;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.composer {
  font-size: smaller;
  opacity: 0.8;
  /* margin-top: -3px; */
}

.img {
  width: calc(var(--width) - 1.5 * var(--border-size));
  height: var(--width);
}

.wrapper {
  min-width: var(--width);
  max-width: var(--width);
  min-height: calc(var(--width) * var(--height-to-width-ratio));
  max-height: calc(var(--width) * var(--height-to-width-ratio));

  border: var(--border-size) solid var(--border-color);
  /* box-shadow: 0px 0px 15px var(--border-color); */

  border-radius: var(--border-radius);
  overflow: hidden;
  transition: all 0.4s;
}

.wrapper:hover {
  cursor: pointer;
  border-color: var(--primary-color);
}
</style>
