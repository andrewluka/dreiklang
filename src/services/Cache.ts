import { type ComposerInfo, type WorkInfo } from "@/services/FetchDetails";

enum IdPrefix {
  COMPOSER = "c",
  WORK = "w",
}

const tryAddToCache = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

const remove = (idPrefix: IdPrefix, id: string) => {
  localStorage.removeItem(`${idPrefix}${id}`);
};

export const addWorkToCache = (work: WorkInfo) =>
  tryAddToCache(`${IdPrefix.WORK}${work.work.id}`, JSON.stringify(work));

export const addComposerToCache = (composer: ComposerInfo) =>
  tryAddToCache(`${IdPrefix.COMPOSER}${composer.id}`, JSON.stringify(composer));

const get = <T>(idPrefix: IdPrefix, id: string): T | null => {
  const str = localStorage.getItem(`${idPrefix}${id}`);
  return str ? JSON.parse(str) : null;
};

export const getWorkFromCache = (workId: string) => get<WorkInfo>(IdPrefix.WORK, workId);
export const getComposerFromCache = (composerId: string) =>
  get<ComposerInfo>(IdPrefix.COMPOSER, composerId);

export const removeWorkFromCache = (workId: string) => remove(IdPrefix.WORK, workId);
export const removecomposerFromCache = (composerId: string) =>
  remove(IdPrefix.COMPOSER, composerId);
