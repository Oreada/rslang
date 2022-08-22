import { BASE_API } from '../../constants/constants';
import { getWordById } from '../../components/api/api';

export const wordAudiochallenge = await getWordById('5e9f5ee35eb9e72bc21af4bb');

export const optionsAudiochallenge = [
    { wordRussian: 'йцуке', idWord: '123' },
    { wordRussian: 'нгшщз', idWord: '456' },
    { wordRussian: 'фывап', idWord: '789' },
    { wordRussian: 'ролдж', idWord: '369' },
    { wordRussian: 'ячсми', idWord: '258' },
];

function drawAudiochallengeAnswerCard(wordImagePath: string, wordEnglish: string, wordAudioPath: string) {
    return `<div class="answer-card__picture">
                <img src="${BASE_API}/${wordImagePath}" alt="Image" class="answer-card__image">
            </div>
            <div class="answer-card__value">
                <button class="answer-card__audio-btn" data-audiopath="${wordAudioPath}">ЗВУК</button>
                <div class="answer-card__text">${wordEnglish}</div>
            </div>`;
}

function drawAudiochallengeOption(wordRussian: string, idWord: string) {
    return `<input type="radio" id="${idWord}" name="list-options" value="${wordRussian}">
            <label for="${idWord}">${wordRussian}</label>`;
}

function drawAudiochallengeList(array: Array<Record<string, string>>) {
    let listHtml = '';
    for (let i = 0; i < array.length; i += 1) {
        listHtml += drawAudiochallengeOption(array[i].wordRussian, array[i].idWord);
    }
    return listHtml;
}

//* TODO: куда-то в этой функции всунуть 'idWord: string'
export function drawAudiochallengePage(
    wordImagePath: string,
    wordEnglish: string,
    wordAudioPath: string,
    array: Array<Record<string, string>>
): string {
    return `<div class="audiochallenge">
                <div class="audiochallenge__wrapper">
                    <div class="audiochallenge__top-ac top-ac">
                        <div class="top-ac__question-card question-card _active">
                            <button class="question-card__audio-btn">ЗВУК</button>
                        </div>
                        <div class="top-ac__answer-card answer-card">
                        ${drawAudiochallengeAnswerCard(wordImagePath, wordEnglish, wordAudioPath)}
                        </div>
                    </div>
                    <div class="audiochallenge__medium-ac medium-ac">
                        ${drawAudiochallengeList(array)}
                    </div>
                    <div class="audiochallenge__bottom-ac bottom-ac">
                        <button class="bottom-ac__next-btn">СЛЕДУЮЩЕЕ СЛОВО</button>
                    </div>
                </div>
            </div>`;
}

export function startWordAudio(urlAudio: string) {
    const audio = new Audio(urlAudio);
    (audio as HTMLAudioElement).play();
}

console.log(wordAudiochallenge);

export const audiochallengeContent = drawAudiochallengePage(
    wordAudiochallenge.image,
    wordAudiochallenge.word,
    wordAudiochallenge.audio,
    optionsAudiochallenge
);

// <audio src="${BASE_API}/${word.audio}" id="audio-${word.id}"></audio>
// onclick="startWordAudio('${BASE_API}/${wordAudioPath}')"

// const body = document.querySelector('body') as HTMLElement;
// body.insertAdjacentHTML('afterbegin', audiochallengeHtml);
