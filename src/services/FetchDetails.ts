import { getComposerFromCache, getWorkFromCache } from "./Cache";
import { sanitize } from "./utils";

const BASE_URL = "https://api.openopus.org";

export type Epoch =
  | "Medieval"
  | "Renaissance"
  | "Baroque"
  | "Classical"
  | "Early Romantic"
  | "Romantic"
  | "Late Romantic"
  | "20th Century"
  | "Post-War"
  | "21st Century";

export type Genre = "Chamber" | "Keyboard" | "Orchestral" | "Stage" | "Vocal";

interface ResponseStatus {
  api: string;
  processingtime: number;
  // source: string;
  success: "true" | "false";
  version: string;
}

export type WorkInfo = Omit<WorkInfoResponse, "status">;

export interface WorkInfoResponse {
  composer: {
    id: string;
    name: string;
    complete_name: string;
    epoch: Epoch;
  };
  status: ResponseStatus;
  work: {
    genre: Genre;
    title: string;
    subtitle: string;
    id: string;
  };
}

export interface ComposerInfo {
  id: string;
  name: string;
  complete_name: string;

  /**
   * format: "{year}-01-01"
   * */
  birth: string;

  /**
   * format: "{year}-01-01"
   * */
  death: string;
  epoch: Epoch;

  /**
   * url to picture
   * */
  portrait: string;
}

export interface ComposersInfoResponse {
  status: ResponseStatus & { rows: number };
  request: { type: "ids"; item: string };
  composers: ComposerInfo[];
}

export interface WorkWithComposerInfo {
  workInfo: WorkInfo;
  composerInfo: ComposerInfo;
}

type Impossible<K extends keyof any> = {
  [P in K]: never;
};

// The secret sauce! Provide it the type that contains only the properties you want,
// and then a type that extends that type, based on what the caller provided
// using generics.
type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;

interface _RandomWorksFetchOptions {
  requestOptions?: {
    popularwork?: "1" | "0";
    recommendedwork?: "1" | "0";
    popularcomposer?: "1" | "0";
    recommendedcomposer?: "1" | "0";
    genre?: "All" | Genre;
    epoch?: "All" | Epoch;
    /**
     * List of IDs of composers. Return only works by specified composers
     *
     */
    composer?: string[];
    /**
     * List of IDs of composers, whose works not to return
     *
     */
    composer_not?: string[];
    /**
     * List of IDs of composers, whose works not to return
     *
     */
    work?: string[];
  };

  /**
   * Limits number of works returned
   */
  limit?: number;
}

type RandomWorksFetchOptions = NoExtraProperties<_RandomWorksFetchOptions>;

const get = <T extends { status: ResponseStatus }>(endpoint: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", `${BASE_URL}${endpoint}`, true);

      xmlHttp.onload = () => {
        const response: T = JSON.parse(xmlHttp.responseText);
        response.status.success === "true" ? resolve(response) : reject(response);
      };

      xmlHttp.onerror = reject;

      xmlHttp.send(null);
    } catch (e) {
      reject(e);
    }
  });
};

export const fetchRandomWorks = async (
  options: RandomWorksFetchOptions = {
    requestOptions: {
      popularcomposer: "1",
      popularwork: "1",
      recommendedcomposer: "1",
      recommendedwork: "1",
    },
    limit: 7,
  }
): Promise<WorkWithComposerInfo[]> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = async () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        if (res.status.success !== "true") reject(res.status);

        const works: WorkWithComposerInfo[] = await Promise.all(
          res.works.map((w: any) => fetchWorkWithComposerInfo(w.id))
        );

        resolve(works);
      }
    };

    xhr.onerror = reject;

    // to avoid redirect
    xhr.open("POST", "https://dynapi.openopus.org/dyn/work/random/", true);

    xhr.send();
  });
};

export const fetchWorkInfo = async (workId: string): Promise<WorkInfo> => {
  const cachedInfo = getWorkFromCache(workId);
  return cachedInfo ? cachedInfo : get<WorkInfoResponse>(`/work/detail/${workId}.json`);
};

export const fetchComposersInfo = async (composerIds: string[]): Promise<ComposersInfoResponse> =>
  get(`/composer/list/ids/${composerIds.join(",")}.json`);

export const fetchComposerInfo = async (composerId: string): Promise<ComposerInfo> => {
  const cachedInfo = getComposerFromCache(composerId);
  return cachedInfo ? cachedInfo : (await fetchComposersInfo([composerId])).composers[0];
};

export const fetchWorkWithComposerInfo = async (workId: string): Promise<WorkWithComposerInfo> => {
  const workInfo = await fetchWorkInfo(workId);
  const composerInfo = await fetchComposerInfo(workInfo.composer.id);

  return { workInfo, composerInfo };
};

export const searchWorks = async (query: string, page: number) => {
  type Res = WorkInfo & { composer: ComposerInfo };

  try {
    const res: Res[] = ((await get(`/omnisearch/${sanitize(query)}/${page || 0}.json`)) as any)
      .results;

    while (!res[0].work) res.shift();

    return res;
  } catch (e: any) {
    if (e?.status?.error === "Nothing found") return [];
    else throw e;
  }
};
