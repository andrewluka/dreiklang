// to document user's viewing history and save it locally

import type { ComposerInfo, WorkInfo } from "@/services/FetchDetails";
import {
  addComposerToCache,
  addWorkToCache,
  getWorkFromCache,
  removeWorkFromCache,
  removecomposerFromCache,
} from "./Cache";

const VIEWING_HISTORY_KEY = "viewing_history";
const VIEWING_HISTORY_DELIMITER = ",";

const getViewedWorkIds = () =>
  localStorage.getItem(VIEWING_HISTORY_KEY)?.split(VIEWING_HISTORY_DELIMITER) || [];

const MAX_VIEWING_HISTORY = 10;

const addWorkToViewingHistory = (id: string, work?: WorkInfo, composerInfo?: ComposerInfo) => {
  const idStr = String(id);
  const h = getViewedWorkIds().filter((w) => w !== idStr);
  h.unshift(idStr);

  while (h.length > MAX_VIEWING_HISTORY) {
    const workId = h.pop();
    if (!workId) continue;

    const work = getWorkFromCache(workId);

    if (!work) continue;

    const composerId = work.composer.id;

    removecomposerFromCache(composerId);
    removeWorkFromCache(workId);
  }

  localStorage.setItem(VIEWING_HISTORY_KEY, h.join(VIEWING_HISTORY_DELIMITER));

  work && addWorkToCache(work);
  composerInfo && addComposerToCache(composerInfo);
};

export { getViewedWorkIds, MAX_VIEWING_HISTORY, addWorkToViewingHistory };
