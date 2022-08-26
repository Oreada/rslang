import { sprintStorage } from "../../storage/storage";
import { IWord } from "../../types/types";
import { getSprintWords, resetSprintProgress, sprintTimer, updateSprintProgressRender, updateSprintProgressState } from "./gameSprintFunctions";
import { renderSprintGame } from "./renderSprintGame";

export function addStartSprintListener() {
  const target = document.querySelector('.sprint-start-button') as HTMLButtonElement;
  const start = document.querySelector('.sprint-start') as HTMLButtonElement;
  const game = document.querySelector('.sprint-game-container') as HTMLElement;
  if (!target || !game || !start) {
    return;
  }

  target.addEventListener('click', () => {
    sprintTimer();
    game.classList.remove('hidden');
    start.classList.add('hidden')
  })
}

export function addSprintListener() {
  const target = document.querySelector('.sprint-button') as HTMLButtonElement;
  const game = document.querySelector('.sprint-game-container') as HTMLElement;
  if (!target || !game) {
    return;
  }

  target.addEventListener('click', async () => {
    console.log('aaa')
  })
}

export function addGameButtonListener() {
  const target = document.querySelectorAll('.sprint-button') as NodeListOf<HTMLButtonElement>;
  const game = document.querySelector('.sprint-main') as HTMLElement;
  if (!target || !game) {
    return;
  }

  target.forEach((item) => {
    item.addEventListener('click', async () => {

      const isCorrect: string = ((sprintStorage.originWord as IWord).id === (sprintStorage.translateWord as IWord).id).toString();
  
      if (isCorrect === item.dataset.correctly) {
        sprintStorage.currentScore += sprintStorage.scoreDecrease;
        sprintStorage.levelProgress += 1;
      } else {
        resetSprintProgress();
      }

      await getSprintWords();
      updateSprintProgressState();

      game.innerHTML = renderSprintGame();
      updateSprintProgressRender();
    })
  })
}

export function addEndSprintListener() {
  const start = document.querySelector('.sprint-start') as HTMLButtonElement;
  const result = document.querySelector('.sprint-result-container') as HTMLElement;
  if (!result || !start) {
    return;
  }

  result.addEventListener('click', (event: Event) => {
    if ((event.target as HTMLButtonElement).classList.contains('sprint-result-button')) {
      start.classList.remove('hidden')
      result.classList.add('hidden');
    }
  })
}

export function addSprintOptionListener() {
  const target = document.querySelectorAll('.sprint-group-option') as NodeListOf<HTMLOptionElement>;
  if (!target) {
    return;
  }

  target.forEach((item) => {
    item.addEventListener('click', () => {
      sprintStorage.currentChapter = item.value;
    })
  })
}