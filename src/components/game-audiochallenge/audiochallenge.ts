import { BASE_API, AMOUNT_PAGES_AUDIOCHALLENGE, NUMBER_OF_OPTIONS_AUDIOCHALLENGE } from '../../constants/constants';
import { getWordById } from '../../components/api/api';
import { getRandomWords, getRandomCardsAudiochallenge } from '../../components/api/api-games';
import { getRandomIdWord } from '../../general-functions/random';
import { shuffle } from '../../general-functions/shuffle';
import { IWord } from '../../types/types';

console.log('audiochallenge loaded');

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

// console.log(await getRandomWords('1', '3'));
// console.log(await getRandomCardsAudiochallenge('10', '1', '5'));

export async function renderAudiochallenge(amountCards: string, group: string, num: string): Promise<string> {
    let allAudiochallengeCards = ``;

    const cardsForGame = await getRandomCardsAudiochallenge(amountCards, group, num);

    for (let i = 0; i < cardsForGame.length; i += 1) {
        const optionsAudiochallenge = [];
        optionsAudiochallenge.push({
            wordRussian: cardsForGame[i].correct.wordTranslate,
            idWord: cardsForGame[i].correct.id,
        });

        for (let j = 0; j < Number(num) - 1; j += 1) {
            optionsAudiochallenge.push({
                wordRussian: cardsForGame[i].incorrect[j].wordTranslate,
                idWord: cardsForGame[i].incorrect[j].id,
            });
        }

        shuffle(optionsAudiochallenge); //! перемешиваю объекты-опции, иначе правильный вариант всегда первый

        const page = drawAudiochallengePage(
            cardsForGame[i].correct.image,
            cardsForGame[i].correct.word,
            cardsForGame[i].correct.audio,
            optionsAudiochallenge
        );

        allAudiochallengeCards += page;
    }

    return allAudiochallengeCards;
}

export async function contentAudiochallengeWithWrapper(group: string) {
    return `<div class="audiochallenge__slider">
                <div class="audiochallenge__row">
                    ${await renderAudiochallenge(AMOUNT_PAGES_AUDIOCHALLENGE, group, NUMBER_OF_OPTIONS_AUDIOCHALLENGE)}
                </div>
            </div>`;
}

// ${await renderAudiochallengeSlider(group)}

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
    return `<div class="audiochallenge__page">
                <div class="audiochallenge__page-wrapper">
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
