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
                    <button class="correct-list__audio-btn audiobutton-results" data-audiopath="${word.audio}">
                        <?xml version="1.0" encoding="iso-8859-1"?>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
                        <circle style="fill:#38454F;" cx="29" cy="29" r="29"/>
                        <path style="fill:#7383BF;" d="M16.427,20H8.104C6.942,20,6,20.942,6,22.104v12.793C6,36.058,6.942,37,8.104,37h8.323
                            c0.375,0,0.743,0.1,1.067,0.29L30.83,49.706C32.232,50.531,34,49.52,34,47.893V9.107c0-1.627-1.768-2.638-3.17-1.813L17.494,19.71
                            C17.17,19.9,16.802,20,16.427,20z"/>
                        <path style="fill:#EFCE4A;" d="M41.541,42.042c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414
                            c6.238-6.238,6.238-16.39,0-22.628c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0c7.018,7.019,7.018,18.438,0,25.456
                            C42.052,41.944,41.796,42.042,41.541,42.042z"/>
                        <path style="fill:#EFCE4A;" d="M38,38c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414
                            c4.297-4.297,4.297-11.289,0-15.586c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0c5.077,5.077,5.077,13.337,0,18.414
                            C38.512,37.902,38.256,38,38,38z"/>
                        </svg>
                    </button>
                    <div class="correct-list__text"><span></span>${word.word} - <span>${word.wordTranslate}</span></div>
                </li>
            `;
    }

    for await (const pair of incorrectAnswers) {
        const word = await getWordById(pair[0]);
        contentIncorrect += `
                <li class="incorrect-list__item">
                    <button class="incorrect-list__audio-btn audiobutton-results" data-audiopath="${word.audio}">
                        <?xml version="1.0" encoding="iso-8859-1"?>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
                        <circle style="fill:#38454F;" cx="29" cy="29" r="29"/>
                        <path style="fill:#7383BF;" d="M16.427,20H8.104C6.942,20,6,20.942,6,22.104v12.793C6,36.058,6.942,37,8.104,37h8.323
                            c0.375,0,0.743,0.1,1.067,0.29L30.83,49.706C32.232,50.531,34,49.52,34,47.893V9.107c0-1.627-1.768-2.638-3.17-1.813L17.494,19.71
                            C17.17,19.9,16.802,20,16.427,20z"/>
                        <path style="fill:#EFCE4A;" d="M41.541,42.042c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414
                            c6.238-6.238,6.238-16.39,0-22.628c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0c7.018,7.019,7.018,18.438,0,25.456
                            C42.052,41.944,41.796,42.042,41.541,42.042z"/>
                        <path style="fill:#EFCE4A;" d="M38,38c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414
                            c4.297-4.297,4.297-11.289,0-15.586c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0c5.077,5.077,5.077,13.337,0,18.414
                            C38.512,37.902,38.256,38,38,38z"/>
                        </svg>
                    </button>
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
                <button class="results__end-btn">ок</button>
            </div>
    `;

    const audioButtonsResults = document.querySelectorAll('.audiobutton-results') as NodeListOf<HTMLButtonElement>;
    audioButtonsResults.forEach((button: HTMLButtonElement) => button.addEventListener('click', playWordAudioForGame));
}
