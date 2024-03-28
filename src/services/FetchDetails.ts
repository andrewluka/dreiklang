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

interface SingleWorkResponseStatus {
  api: string;
  processingtime: number;
  source?: string;
  success: "true" | "false";
  version: string;
}

interface MultipleWorksResponseStatus extends SingleWorkResponseStatus {
  rows: number;
}

export type WorkInfo = Omit<WorkInfoResponse, "status">;

export interface WorkInfoResponse {
  composer: {
    id: string;
    name: string;
    complete_name: string;
    epoch: Epoch;
  };
  status: SingleWorkResponseStatus;
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
  status: MultipleWorksResponseStatus;
  request: { type: "ids"; item: string };
  composers: ComposerInfo[];
}

export interface WorkWithComposerInfo {
  workInfo: WorkInfo;
  composerInfo: ComposerInfo;
}

const get = <T extends { status: SingleWorkResponseStatus }>(endpoint: string): Promise<T> => {
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

export const fetchRandomWorks = async (): Promise<WorkWithComposerInfo[]> => {
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

export type SearchResultWork = WorkInfo & { composer: ComposerInfo };

export interface SearchResult {
  request: {
    type: "omnisearch";
    search: string;
    /**
     * can be parsed as an integer
     */
    offset: string;
  };
  next: number;
  results: SearchResultWork[];
  status: MultipleWorksResponseStatus;
}

export const searchWorks = async (query: string, page: number): Promise<SearchResult | "none"> => {
  try {
    const res: SearchResult = await get(`/omnisearch/${sanitize(query)}/${page || 0}.json`);

    while (!res.results[0].work) res.results.shift();

    return res;
  } catch (e: any) {
    if (e?.status?.error === "Nothing found") return "none";
    else throw e;
  }
};
