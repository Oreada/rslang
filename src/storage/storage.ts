import { getWordById } from "../components/api/api";
import { SPRINT_MIN_COEFFICIENT, SPRINT_PROGRESS_BARS_QUANTITY } from "../constants/constants";
import { getRandomIdWord } from "../general-functions/random";
import { ISprintStorage, IStorage } from "../types/types";

export const storage: IStorage = {
  pageCount: '0',
  chapterCount: '0',
  currentPage: null,
}

export const sprintStorage: ISprintStorage = {
  currentChapter: '0',
  originWord: await getWordById(await getRandomIdWord('0')),
  translateWord: await getWordById(await getRandomIdWord('0')),
  level: 0,
  levelProgress: 0,
  levelProgressBar: SPRINT_PROGRESS_BARS_QUANTITY,
  currentScore: 0,
  bestScore: 0,
  scoreDecrease: SPRINT_MIN_COEFFICIENT
}