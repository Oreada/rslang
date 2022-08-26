import { sprintStorage } from "../../storage/storage";
import { IWord } from "../../types/types";

export function renderSprintTimer(count: number): string {
  const str = `<div class="sprint-timer-container">
    <div class="sprint-timer-counter">${count}</div>
  </div>`;
  
  return str;
}

export function renderUsualSprintResult(): string {
  const str = `<div class="sprint-result">
    <div class="sprint-current-result">
      Твой результат ${sprintStorage.currentScore}!
    </div>
    <div class="sprint-best-result">
      Твой рекорд: ${sprintStorage.bestScore}
    </div>
    <button class="sprint-result-button">
      Закрыть
    </button>
  </div>`;

  return str;
}

export function renderBestSprintResult(): string {
  const str = `<div class="sprint-result">
    <div class="sprint-current-result">
      Твой результат ${sprintStorage.currentScore}!
    </div>
    <div class="sprint-new-best-result">
      Поздравляем! Это новый рекорд!
    </div>
    <button class="sprint-result-button">
      Закрыть
    </button>
  </div>`;

  return str;
}

function renderSprintProgressBar(): string {
  let str = '';

  for (let i = 0; i < sprintStorage.levelProgressBar; i++) {
    str += `<div class="sprint-progress-counter"></div>`;
  }

  return str;
}

export function renderSprintGame(): string {
  const str = `
      <div class="sprint-score">
        ${sprintStorage.currentScore}
      </div>
      <div class="sprint-game-content">
        <div class="sprint-text">
          Стоимость слова ${sprintStorage.scoreDecrease} очков
        </div>
        <div class="sprint-progress">
          ${renderSprintProgressBar()}
        </div>
        <div class="sprint-words-container">
          <div class="sprint-word">
            ${(sprintStorage.originWord as IWord).word}
          </div>
          <div class="sprint-word">
            ${(sprintStorage.translateWord as IWord).wordTranslate}
          </div>
        </div>
      </div>`;

  return str;
}


export function renderSprint(): string {
  const str = `<section class="sprint-container">
    <div class="sprint-start">
      <div class="sprint-text">Текст про спринт</div>
      <button class="sprint-start-button">Начать спринт</button>
      <select class="sprint-select">
        <option class="sprint-group-option" value="0">0</option>
        <option class="sprint-group-option" value="1">1</option>
        <option class="sprint-group-option" value="2">2</option>
        <option class="sprint-group-option" value="3">3</option>
        <option class="sprint-group-option" value="4">4</option>
        <option class="sprint-group-option" value="5">5</option>
      </select>
    </div>
    <div class="sprint-result-container hidden"></div>
    <div class="sprint-game-container hidden">
      <div class="sprint-timer">
      </div>
      <div class="sprint-main">
        ${renderSprintGame()}
      </div>
      <div class="sprint-buttons-container">
        <button class="sprint-button sprint-true-button" data-correctly="true">Верно</button>
        <button class="sprint-button sprint-false-button" data-correctly="false">Неверно</button>
      </div>
      </div>
    </div>
  </section>`;

  return str;
}