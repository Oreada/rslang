import {SPRINT_MIN_COEFFICIENT, SPRINT_PROGRESS_BARS_QUANTITY, SPRINT_TIMER_LIMIT } from "../../constants/constants";
import { getRandomIdWord, getRandomNumber } from "../../general-functions/random";
import { sprintStorage, storage} from "../../storage/storage";
import { IAuthorizationResult, IWord, _IWord } from "../../types/types";
import { getWordById, getWords } from "../api/api";
import { getRandomWords, getRandomWordsWithExcluded } from "../api/api-games";
import { renderSprintResultsPage } from "../results-of-games/games-results";
import { renderBestSprintResult, renderSprintTimer, renderUsualSprintResult } from "./renderSprintGame";

async function showSprintResult(): Promise<void> {
  const target = document.querySelector('.sprint-result-container') as HTMLElement;
  const game = document.querySelector('.sprint-game-container') as HTMLElement;
  if (!target || !game) {
    return;
  }

  if (sprintStorage.currentScore >= sprintStorage.bestScore) {
    sprintStorage.bestScore = sprintStorage.currentScore;
    target.innerHTML = renderBestSprintResult();
  } else {
    target.innerHTML = renderUsualSprintResult();
  }
  const statContainer = document.querySelector('.sprint-result-statistic') as HTMLElement;
  await renderSprintResultsPage(statContainer, sprintStorage.gameResult);

  target.classList.remove('hidden');
  game.classList.add('hidden');
  sprintStorage.currentScore = 0;
  resetSprintProgress();
}

export function sprintTimer() {
  const target = document.querySelector('.sprint-timer') as HTMLElement;
  if (!target) {
    return;
  }

  let timerLimit = SPRINT_TIMER_LIMIT;
  let sprintTimer: null | NodeJS.Timer = null;

  function countdown() {
    if (timerLimit <= 0) {
      clearInterval(sprintTimer as NodeJS.Timer);
        showSprintResult();
      return;
    }

    timerLimit -= 1;
    console.log(timerLimit)
    target.innerHTML = renderSprintTimer(timerLimit);
  }

  countdown();
  sprintTimer = setInterval(countdown, 1000);
}

export async function getSprintWords() {
  const isSameWords = getRandomNumber(2);

  const originId: string = await getRandomIdWord(sprintStorage.currentChapter);
  let translateId: string;

  if (isSameWords) {
    translateId = originId;
  } else {
    do {
      translateId = await getRandomIdWord(sprintStorage.currentChapter)
    } while (translateId === originId);
  }

  const originWord = await getWordById(originId);
  const translateWord = await getWordById(translateId);

  sprintStorage.originWord = originWord;
  sprintStorage.translateWord = translateWord;

  console.log(sprintStorage.level, sprintStorage.levelProgressBar)
}

export async function getPageForSprint(): Promise<void> {
  const isAuthorized = localStorage.getItem('rslang_currentUser#');
  if (sprintStorage.gameSource === 'menu') {
    const words = await getRandomWords(sprintStorage.currentChapter, '600');
    sprintStorage.currentPageWords = words;
    return;
  }

  if (isAuthorized) {
    const user: IAuthorizationResult = JSON.parse(isAuthorized);
    const userId = user.userId;
    const userToken = user.token;

    const words = (await getRandomWordsWithExcluded(userId, userToken, 'easy', sprintStorage.currentChapter, '600', sprintStorage.currentPage) as Array<_IWord>);
    sprintStorage.currentPageWords = words;
    return;
  }
 
  const words = await getRandomWords(sprintStorage.currentChapter, '20', sprintStorage.currentPage);
  sprintStorage.currentPageWords = words;
}

export async function getSprintWordsFromPage() {
  if ((sprintStorage.currentPageWords as Array<_IWord>).length === 0) {
    if (+sprintStorage.currentPage - 1 < 0) {
      const highestTimeoutId = setTimeout(";");
      for (let i = 0 ; i < highestTimeoutId ; i++) {
          clearTimeout(i);
      }
      await showSprintResult();
      return;
    }
    const num = (+sprintStorage.currentPage - 1).toString();
    sprintStorage.currentPage = num;
    await getPageForSprint();
  }

  const wordsArr = [...(sprintStorage.currentPageWords as Array<_IWord>)];
  console.log(wordsArr, 'ww')

  if (wordsArr.length === 1) {
    const word = wordsArr[0];
    sprintStorage.originWord = word;
    sprintStorage.translateWord = word;
    
    wordsArr.pop();

    sprintStorage.currentPageWords = wordsArr;
    return;
  }

  const isSameWords = getRandomNumber(2);

  const index1 = getRandomNumber(wordsArr.length);
  let index2;

  console.log(isSameWords, 'same')

  if (isSameWords) {
    index2 = index1;
  } else {
    do {
      index2 = getRandomNumber(wordsArr.length)
    } while (index1 === index2);
  }

  console.log(index1, index2, 'i')

  sprintStorage.originWord = wordsArr[index1];
  sprintStorage.translateWord = wordsArr[index2];

  const word1 = wordsArr[index1];
  const word2 = wordsArr[index2];
  // console.log(word1.id, word2.id)

  const newWordsArr = wordsArr.filter((item) => (item.word !== word1.word));
//  const newWordsArr = wordsArr;
  
  sprintStorage.currentPageWords = newWordsArr;
  console.log(sprintStorage.level, sprintStorage.levelProgressBar)
}

export function updateSprintProgressState() {
  if (sprintStorage.levelProgress < sprintStorage.levelProgressBar) {
    return;
  }
  if (sprintStorage.levelProgress === sprintStorage.levelProgressBar) {
    if (sprintStorage.level < SPRINT_PROGRESS_BARS_QUANTITY) {
      sprintStorage.level += 1;
    }
    sprintStorage.scoreDecrease = (2 ** (sprintStorage.level)) * 10;
    return;
  }
  if (sprintStorage.levelProgress > sprintStorage.levelProgressBar) {
    if (sprintStorage.level < SPRINT_PROGRESS_BARS_QUANTITY) {
      sprintStorage.levelProgress = 0;
      sprintStorage.levelProgressBar = SPRINT_PROGRESS_BARS_QUANTITY;
      return;
    }
    if (sprintStorage.level === SPRINT_PROGRESS_BARS_QUANTITY) {
      sprintStorage.levelProgress = 1;
      sprintStorage.levelProgressBar = 1;
      return;
    }
  }
}

export function updateSprintProgressRender() {
  const target = document.querySelectorAll('.sprint-progress-counter') as NodeListOf<HTMLElement>;
  if (!target) {
    return;
  }

  for (let i = 0; i < sprintStorage.levelProgress; i++) {
    console.log(target[i])
    target[i].classList.add('checked');
  }
}

export function resetSprintProgress() {
  sprintStorage.level = 0;
  sprintStorage.levelProgress = 0;
  sprintStorage.levelProgressBar = SPRINT_PROGRESS_BARS_QUANTITY;
  sprintStorage.scoreDecrease = SPRINT_MIN_COEFFICIENT;
}

export async function getStartSprintWords() {
  if (sprintStorage.gameSource === 'menu') {
    console.log('1')
    await getSprintWords();
  } else {
    console.log('2')
    await getSprintWordsFromPage();
  }
}