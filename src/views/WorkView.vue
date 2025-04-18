<script setup lang="ts">
import { useRoute } from "vue-router";
import { onBeforeMount, ref, type Ref } from "vue";
import {
  type ComposerInfo,
  type WorkInfo,
  fetchWorkWithComposerInfo,
} from "@/services/FetchDetails";
import { addWorkToViewingHistory } from "@/services/ViewingHistory";

const route = useRoute();
const workInfo: Ref<WorkInfo | undefined> = ref(undefined);
const composerInfo: Ref<ComposerInfo | undefined> = ref(undefined);

// fetch work details
onBeforeMount(async () => {
  const { workInfo: workDetails, composerInfo: composerDetails } = await fetchWorkWithComposerInfo(
    String(route.params.id)
  );

  addWorkToViewingHistory(workDetails.work.id, workDetails, composerDetails);

  workInfo.value = workDetails;
  composerInfo.value = composerDetails;
});
</script>

<template>
  <pre v-if="!workInfo">loading...</pre>

  <div :class="$style.wrapper">
    <img
      :class="[$style.transition, composerInfo ? $style.visibile : $style.hidden]"
      :src="composerInfo?.portrait"
      width="300"
      height="300"
    />
    <div>
      <h1>{{ workInfo?.work.title || "" }}</h1>
      <p>{{ composerInfo?.complete_name }}</p>
      <h4>{{ workInfo?.work.subtitle || "" }}</h4>
      <h6>{{ workInfo?.work.genre || "" }}</h6>
      <h6>{{ composerInfo?.epoch || "" }}</h6>
      <h6 style="padding-bottom: 15px">{{ workInfo?.work.subtitle || "" }}</h6>
    </div>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  column-gap: 15px;
  row-gap: 15px;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;

  width: 100%;
  height: 100%;

  padding-bottom: 15px;
}

.transition {
  transition: all 0.4s;
}

.visible {
  opacity: 1;
}

.hidden {
  opacity: 0;
}

@media (min-width: 1024px) {
  .wrapper {
    flex-direction: row;
    align-items: flex-start;
  }
}
</style>
