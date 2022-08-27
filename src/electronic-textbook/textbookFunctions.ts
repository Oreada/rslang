import { getUserAggregatedWordsFiltered, getWords } from "../components/api/api";
import { WORDS_PER_PAGE } from "../constants/constants";
import { sprintStorage, storage } from "../storage/storage";
import { IAuthorizationResult, IUserWordsAggregated, IWord, IWordWithDifficulty } from "../types/types";
import { renderAuthorizedPage, renderDifficultPage, renderPage } from "./renderTextbookPage";
import { updatePagButtonState, updatePageCounter } from "./textbookListeners";

export async function updateTextbook(group: string, page: string) {
  const words = await getWords(group, page);
  
  storage.currentPage = words;
  storage.chapterCount = group;
  storage.pageCount = page;
}

export async function updatePageState() {
  const words = document.querySelectorAll('.word-container') as NodeListOf<HTMLElement>;
  if (!words) {
    return;
  }

  const user: IAuthorizationResult = JSON.parse(localStorage.getItem('rslang_currentUser#') as string);
  const userId = user.userId;
  const userToken = user.token;

  const learned = (await getUserAggregatedWordsFiltered(userId, userToken, 'easy') as Array<IUserWordsAggregated>);
  const difficult = (await getUserAggregatedWordsFiltered(userId, userToken, 'hard')  as Array<IUserWordsAggregated>);

  const learnedWordsId = learned[0].paginatedResults.map((item) => item._id);
  const difficultWordsId = difficult[0].paginatedResults.map((item) => item._id);

  words.forEach((item) => {
    const id = item.id.slice(5);

    if (learnedWordsId.includes(id)) {
      item.classList.add('learned-word');
    }
    if (difficultWordsId.includes(id)) {
      item.classList.add('difficult-word');
    }
  })
}

export async function startTextbook() {
  const container = document.querySelector('.textbook-page-container') as HTMLElement;
  const footer = document.querySelector('.textbook-footer') as HTMLElement;
  const isAuthorized = localStorage.getItem('rslang_currentUser#');
  if (isAuthorized) {
    if (storage.chapterCount === 'difficult') {
      const user: IAuthorizationResult = JSON.parse(localStorage.getItem('rslang_currentUser#') as string);
      const userId = user.userId;
      const userToken = user.token;

      const res = await getUserAggregatedWordsFiltered(userId, userToken, 'hard') as Array<IUserWordsAggregated>

      storage.difficultWords = res[0].paginatedResults;
      container.innerHTML = renderDifficultPage(storage.difficultWords as Array<IWordWithDifficulty>);
      footer.classList.add('hidden');
      return;
    }

    const res = await getWords(storage.chapterCount, storage.pageCount);
    storage.currentPage = res;
    sprintStorage.currentChapter = storage.chapterCount;

    container.innerHTML = renderAuthorizedPage(storage.currentPage as Array<IWord>);
    footer.classList.remove('hidden');
    console.log(storage.chapterCount, storage.pageCount, 'change chapter');
    updatePageCounter();
    updatePagButtonState();
    await updatePageState();
    checkLearningPage();
    return;
  }

  if (storage.chapterCount === 'difficult') {
    storage.chapterCount = '0';
    sprintStorage.currentChapter = storage.chapterCount;
  }

  const res = await getWords(storage.chapterCount, storage.pageCount);
  storage.currentPage = res;
  sprintStorage.currentChapter = storage.chapterCount;

  container.innerHTML = renderPage(storage.currentPage as Array<IWord>);
  footer.classList.remove('hidden');
  console.log(storage.chapterCount, storage.pageCount, 'change chapter');
  updatePageCounter();
  updatePagButtonState();
}

export function checkLearningPage() {
  const words = document.querySelectorAll('.word-container') as NodeListOf<HTMLElement>;
  const container = document.querySelector('.world-list-container') as HTMLElement;
  const gameBtns = document.querySelectorAll('.game-btn') as NodeListOf<HTMLButtonElement>;
  const pageCounter = document.querySelector('.page-number') as HTMLElement;
  if (!words || !container || !gameBtns || !pageCounter) {
    return;
  }

  let learningCount = 0;
  let difficultCount = 0;

  words.forEach((item) => {
    if (item.classList.contains('learned-word')) {
      learningCount += 1;
    }
    if (item.classList.contains('difficult-word')) {
      difficultCount += 1;
    }
  })

  console.log(difficultCount, learningCount, 'd', 'l')

  if (learningCount > 0 && learningCount + difficultCount === WORDS_PER_PAGE) {
    container.classList.add('learned-page');
    pageCounter.classList.add('learned-page');
    gameBtns.forEach((item) => {
      item.disabled = true;
    })
    return;
  }
  container.classList.remove('learned-page');
  pageCounter.classList.remove('learned-page');
  gameBtns.forEach((item) => {
    item.disabled = false;
  })
}