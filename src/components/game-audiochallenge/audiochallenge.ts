import { BASE_API } from '../../constants/constants';
import { getWordById } from '../../components/api/api';
import { getRandomIdWord } from '../../general-functions/random';

export function playWordAudioForGame(event: Event) {
    console.log('audio works!');
    const targetButton = event.target as HTMLButtonElement;
    if (
        targetButton.classList.contains('answer-card__audio-btn') ||
        targetButton.classList.contains('question-card__audio-btn')
    ) {
        const path = `http://localhost:45741/${targetButton.dataset.audiopath as string}`;
        const audio = new Audio(path);
        (audio as HTMLAudioElement).play();
    }
}

//! =====================================================================================================================

const temporaryGroupValue = '0'; //! потом значение группы будет браться со страницы (уровень сложности)

const idForMainWord = await getRandomIdWord(temporaryGroupValue);

const mainWordAudiochallenge = await getWordById(idForMainWord);

const optionsAudiochallenge = [
    { wordRussian: 'йцуке', idWord: '123' },
    { wordRussian: 'нгшщз', idWord: '456' },
    { wordRussian: 'фывап', idWord: '789' },
    { wordRussian: 'ролдж', idWord: '369' },
    { wordRussian: 'ячсми', idWord: '258' },
];

//! =====================================================================================================================

function drawAudiochallengeAnswerCard(wordImagePath: string, wordEnglish: string, wordAudioPath: string): string {
    return `<div class="answer-card__picture">
                <img src="${BASE_API}/${wordImagePath}" alt="Image" class="answer-card__image">
            </div>
            <div class="answer-card__value">
                <button class="answer-card__audio-btn" data-audiopath="${wordAudioPath}">ЗВУК</button>
                <div class="answer-card__text">${wordEnglish}</div>
            </div>`;
}

function drawAudiochallengeOption(wordRussian: string, idWord: string): string {
    return `<input type="radio" id="${idWord}" name="list-options" value="${wordRussian}">
            <label for="${idWord}">${wordRussian}</label>`;
}

function drawAudiochallengeList(array: Array<Record<string, string>>): string {
    let listHtml = '';
    for (let i = 0; i < array.length; i += 1) {
        listHtml += drawAudiochallengeOption(array[i].wordRussian, array[i].idWord);
    }
    return listHtml;
}

//* TODO: куда-то в этой функции всунуть 'idWord: string'
function drawAudiochallengePage(
    wordImagePath: string,
    wordEnglish: string,
    wordAudioPath: string,
    optionsList: Array<Record<string, string>>
): string {
    return `<div class="audiochallenge">
                <div class="audiochallenge__wrapper">
                    <div class="audiochallenge__top-ac top-ac">
                        <div class="top-ac__question-card question-card _active">
                            <button class="question-card__audio-btn" data-audiopath="${wordAudioPath}">ЗВУК</button>
                        </div>
                        <div class="top-ac__answer-card answer-card">
                        ${drawAudiochallengeAnswerCard(wordImagePath, wordEnglish, wordAudioPath)}
                        </div>
                    </div>
                    <div class="audiochallenge__medium-ac medium-ac">
                        ${drawAudiochallengeList(optionsList)}
                    </div>
                    <div class="audiochallenge__bottom-ac bottom-ac">
                        <button class="bottom-ac__next-btn">СЛЕДУЮЩЕЕ СЛОВО</button>
                    </div>
                </div>
            </div>`;
}

console.log('mainWordAudiochallenge =', mainWordAudiochallenge);

export const audiochallengeContent = drawAudiochallengePage(
    mainWordAudiochallenge.image,
    mainWordAudiochallenge.word,
    mainWordAudiochallenge.audio,
    optionsAudiochallenge
);

// <audio src="${BASE_API}/${word.audio}" id="audio-${word.id}"></audio>

// const body = document.querySelector('body') as HTMLElement;
// body.insertAdjacentHTML('afterbegin', audiochallengeHtml);
