// to document user's viewing history and save it locally

type Epoch =
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

type Genre = "Chamber" | "Keyboard" | "Orchestral" | "Stage" | "Vocal";

interface CachedWorkInfo {
  composer: {
    id: string;
    name: string;
    complete_name: string;
    epoch: Epoch;
  };
  work: {
    genre: Genre;
    title: string;
    subtitle: string;
    id: string;
  };
}

const VIEWING_HISTORY_KEY = "viewing_history";
const VIEWING_HISTORY_DELIMITER = ",";

const getViewedWorkIds = () =>
  localStorage.getItem(VIEWING_HISTORY_KEY)?.split(VIEWING_HISTORY_DELIMITER) || [];

const MAX_VIEWING_HISTORY = 10;

const addToViewingHistory = (id: number) => {
  const idStr = String(id);
  const h = getViewedWorkIds().filter((w) => w !== idStr);
  h.push(idStr);

  while (h.length > MAX_VIEWING_HISTORY) h.shift();

  localStorage.setItem(VIEWING_HISTORY_KEY, h.join(VIEWING_HISTORY_DELIMITER));
};

export { getViewedWorkIds, MAX_VIEWING_HISTORY, addToViewingHistory };
