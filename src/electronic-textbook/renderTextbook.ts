import { IWord } from "../types/types";
import { renderPage } from "./renderTextbookPage";

function textbookNavRender(): string {
  const str = `<button class="textbook-nav-btn regular-chapter-btn">
    Первый
  </button>
  <button class="textbook-nav-btn regular-chapter-btn">
    Второй
  </button>
  <button class="textbook-nav-btn regular-chapter-btn">
    Третий
  </button>
  <button class="textbook-nav-btn regular-chapter-btn">
    Четвертый
  </button>
  <button class="textbook-nav-btn regular-chapter-btn">
    Пятый
  </button>
  <button class="textbook-nav-btn regular-chapter-btn">
    Шестой
  </button>
  <button class="textbook-nav-btn difficult-chapter-btn">
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
      1
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

export function textbookRender(parent: HTMLElement, data: Array<IWord>): void {
  const str = `<section class="textbook-nav">
    ${textbookNavRender()}
  </section>
  <section class="textbook-page-container">
    ${renderPage(data)}
  </section>
  <section class="textbook-footer">
    ${textbookFooterRender()}
  </section>`;

  const textbook = document.createElement('div') as HTMLElement;
  textbook.classList.add('textbook');
  textbook.innerHTML = str;
  parent.append(textbook);
}