import { storage } from '../storage/storage';
import { IWord } from '../types/types';
import { renderPage } from './renderTextbookPage';

function textbookNavRender(): string {
    const isAuthorized = localStorage.getItem('rslang_currentUser#');
    const strAdd = isAuthorized
        ? `  <button class="textbook-nav-btn difficult-chapter-btn" data-group="difficult">
    Седьмой
    </button>`
        : '';
    const str = `<button class="textbook-nav-btn regular-chapter-btn" data-group="0">
        Первый
    </button>
    <button class="textbook-nav-btn regular-chapter-btn" data-group="1">
        Второй
    </button>
    <button class="textbook-nav-btn regular-chapter-btn" data-group="2">
        Третий
    </button>
    <button class="textbook-nav-btn regular-chapter-btn" data-group="3">
        Четвертый
    </button>
    <button class="textbook-nav-btn regular-chapter-btn" data-group="4">
        Пятый
    </button>
    <button class="textbook-nav-btn regular-chapter-btn" data-group="5">
        Шестой
    </button>`;

    return `${str}${strAdd}`;
}

//* TODO: разобраться с актуализацией значения storage.chapterCount + актуальное значение после перезагрузки страницы (localStorage?)
function textbookFooterRender(): string {
    const str = `
    <button class="game-btn audio-game-btn">
        <a href="" class="textbook__game-link nav__link"
        data-rout="/textbook/audiochallenge/${Number(storage.chapterCount) + 1}">Аудиовызов</a>
    </button>
    <div class="page-nav-container">
        <button class="page-nav-btn prev-btn">
            ←
        </button>
        <div class="page-number">
            ${+storage.pageCount + 1}
        </div>
        <button class="page-nav-btn next-btn">
            →
        </button>
    </div>
    <button class="game-btn sprint-game-btn">
        <a href="" class="textbook__game-link nav__link"
        data-rout="/textbook/sprint/${Number(storage.chapterCount) + 1}">Спринт</a>
    </button>`;

    return str;
}

export function renderWordStatistic(sprintWins: string, sprintLoses: string, audioChallengeWins: string, audioChallengeLoses: string): string {
  const str = `<div class="textbook-statistic-container">
    <button class="word-statistic-close">Close</button>
    <div class="word-statistic-content">
      <div class="word-statistic-row">
        <div class="word-statistic-game">Sprint:</div>
        <div class="word-statistic-counter">${sprintWins}</div>
        <div class="word-statistic-counter">${sprintLoses}</div>
      </div>
      <div class="word-statistic-row">
        <div class="word-statistic-game">AudioChallenge</div>
        <div class="word-statistic-counter">${audioChallengeWins}</div>
        <div class="word-statistic-counter">${audioChallengeLoses}</div>
    </div>
    </div>
  </div>`;

  return str;
}

export function textbookRender(): string {
    const str = `<div class="textbook-container">
        <div class="textbook-popup hidden"></div>
        <section class="textbook-nav">
            ${textbookNavRender()}
        </section>
        <section class="textbook-page-container">
            ${renderPage(storage.currentPage as Array<IWord>)}
        </section>
        <section class="textbook-footer">
            ${textbookFooterRender()}
        </section>
    </div>`;

    return str;
}
