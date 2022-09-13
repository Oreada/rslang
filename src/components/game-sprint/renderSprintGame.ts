import { sprintStorage } from '../../storage/storage';
import { IWord } from '../../types/types';
import { Modal } from '../modalWindow/modal';

export function renderSprintTimer(count: number): string {
    const str = `<div class="sprint-timer-container">
    <div class="sprint-timer-counter">${count < 10 ? '&nbsp' : ''}${count}</div>
  </div>`;

    return str;
}

export function renderUsualSprintResult(): string {
    const str = `<div class="sprint-result">
    <div class="sprint-current-result">
      Твой счет: ${sprintStorage.currentScore}!
    </div>
    <div class="sprint-result-statistic"></div>
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
      <div class="sprint-text">Спринт длится 60 секунд. Are you ready?</div>
      <button class="sprint-start-button">START</button>
    </div>
    <div class="sprint-result-container hidden"></div>
    <div class="sprint-game-container hidden">
      <div class="timer-wrapper">
        <svg class="circle-svg" width="100" height="100">
          <circle class="circle" cx="50" cy="50" r="30"  />
        </svg>
        <div class="sprint-timer"></div>
      </div>
      <div class="sprint-main">
        ${renderSprintGame()}
      </div>
      <div class="sprint-buttons-container">
        <button class="sprint-button sprint-true-button" data-correctly="true">◂ Верно</button>
        <button class="sprint-button sprint-false-button" data-correctly="false">Неверно ▸</button>
      </div>
      </div>
    </div>
  </section>`;

    return Modal(str);
}
