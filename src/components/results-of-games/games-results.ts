import { getWordById } from '../api/api';
import { playWordAudioForGame } from '../game-audiochallenge/audiochallenge-render';

//! draw results of game
//! параметр "gameResults" - это обязательно объект вида: ключ - id загаданного слова, значение - строка 'correct' или 'incorrect'
export async function renderResultsPage(container: HTMLElement, gameResults: Record<string, string>) {
    let contentCorrect = '';
    let contentIncorrect = '';

    const entries = Object.entries(gameResults);
    const correctAnswers = entries.filter((pair) => pair[1] === 'correct');
    const incorrectAnswers = entries.filter((pair) => pair[1] === 'incorrect');

    for await (const pair of correctAnswers) {
        const word = await getWordById(pair[0]);
        contentCorrect += `
                <li class="correct-list__item">
                    <button class="correct-list__audio-btn audiobutton-results" data-audiopath="${word.audio}">ЗВУК</button>
                    <div class="correct-list__text"><span></span>${word.word} - <span>${word.wordTranslate}</span></div>
                </li>
            `;
    }

    for await (const pair of incorrectAnswers) {
        const word = await getWordById(pair[0]);
        contentIncorrect += `
                <li class="incorrect-list__item">
                    <button class="incorrect-list__audio-btn audiobutton-results" data-audiopath="${word.audio}">ЗВУК</button>
                    <div class="incorrect-list__text"><span></span>${word.word} - <span>${word.wordTranslate}</span></div>
                </li>
            `;
    }

    container.innerHTML = `
            <div class="results__wrapper">
                <div class="results__correct">
                    <h3 class="results__correct-title">
                        Верно <span class="results__correct-number">${String(correctAnswers.length)}</span>
                    </h3>
                    <ul class="results__correct-list correct-list">${contentCorrect}</ul>
                </div>
                <div class="results__incorrect">
                    <h3 class="results__incorrect-title">
                        Неверно <span class="results__incorrect-number">${String(incorrectAnswers.length)}</span>
                    </h3>
                    <ul class="results__incorrect-list incorrect-list">${contentIncorrect}</ul>
                </div>
                <button class="results__end-btn">ОК</button>
            </div>
    `;

    const audioButtonsResults = document.querySelectorAll('.audiobutton-results') as NodeListOf<HTMLButtonElement>;
    audioButtonsResults.forEach((button: HTMLButtonElement) => button.addEventListener('click', playWordAudioForGame));
}

export async function renderSprintResultsPage(container: HTMLElement, gameResults: Record<string, string>) {
  let contentCorrect = '';
  let contentIncorrect = '';

  const entries = Object.entries(gameResults);
  const correctAnswers = entries.filter((pair) => pair[1] === 'correct');
  const incorrectAnswers = entries.filter((pair) => pair[1] === 'incorrect');

  for await (const pair of correctAnswers) {
      const word = await getWordById(pair[0]);
      contentCorrect += `
              <li class="correct-list__item">
                  <div class="correct-list__text"><span></span>${word.word} - <span>${word.wordTranslate}</span></div>
              </li>
          `;
  }

  for await (const pair of incorrectAnswers) {
      const word = await getWordById(pair[0]);
      contentIncorrect += `
              <li class="incorrect-list__item">
                  <div class="incorrect-list__text"><span></span>${word.word} - <span>${word.wordTranslate}</span></div>
              </li>
          `;
  }

  container.innerHTML = `
          <div class="results__wrapper">
              <div class="results__correct">
                  <h3 class="results__correct-title">
                      Верно <span class="results__correct-number">${String(correctAnswers.length)}</span>
                  </h3>
                  <ul class="results__correct-list correct-list">${contentCorrect}</ul>
              </div>
              <div class="results__incorrect">
                  <h3 class="results__incorrect-title">
                      Неверно <span class="results__incorrect-number">${String(incorrectAnswers.length)}</span>
                  </h3>
                  <ul class="results__incorrect-list incorrect-list">${contentIncorrect}</ul>
              </div>
          </div>
  `;
}