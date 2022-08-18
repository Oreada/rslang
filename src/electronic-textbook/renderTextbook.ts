import { storage } from "../storage/storage";
import { IWord, } from "../types/types";
import { renderPage } from "./renderTextbookPage";

function textbookNavRender(): string {
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
  </button>
  <button class="textbook-nav-btn difficult-chapter-btn" data-group="difficult">
    Седьмой
  </button>`;
  
  return str;
}

function textbookFooterRender(): string {
  const str = `<button class="game-btn audio-game-btn">
    Аудиовызов
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
    Спринт
  </button>`;

  return str;
}

export function textbookRender(): string {
  const str = `<div class="textbook-container">
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