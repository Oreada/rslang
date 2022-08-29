import { BASE_API, AMOUNT_PAGES_AUDIOCHALLENGE, NUMBER_OF_OPTIONS_AUDIOCHALLENGE } from '../../constants/constants';
import { getWordById, createUserWord, getUserAggregatedWordsFiltered } from '../api/api';
import {
    getRandomWords,
    getRandomCardsAudiochallenge,
    getRandomWordsWithExcluded,
    getRandomCardsAudiochallengeWithExcluded,
} from '../api/api-games';
import { getRandomIdWord } from '../../general-functions/random';
import { shuffle } from '../../general-functions/shuffle';
import { IWord } from '../../types/types';

console.log('audiochallenge loaded');

export function playWordAudioForGame(event: Event) {
    console.log('audio works!');
    const targetButton = event.target as HTMLButtonElement;
    if (
        targetButton.classList.contains('answer-card__audio-btn') ||
        targetButton.classList.contains('question-card__audio-btn') ||
        targetButton.classList.contains('correct-list__audio-btn') ||
        targetButton.classList.contains('incorrect-list__audio-btn')
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
    let counter = 0;
    let allAudiochallengeCards = ``;

    const cardsForGame = await getRandomCardsAudiochallenge(amountCards, group, num);

    for (let i = 0; i < cardsForGame.length; i += 1) {
        counter += 1;

        const optionsAudiochallenge = [];
        optionsAudiochallenge.push({
            wordRussian: cardsForGame[i].correct.wordTranslate,
            idWord: cardsForGame[i].correct._id,
        });

        for (let j = 0; j < Number(num) - 1; j += 1) {
            optionsAudiochallenge.push({
                wordRussian: cardsForGame[i].incorrect[j].wordTranslate,
                idWord: cardsForGame[i].incorrect[j]._id,
            });
        }

        shuffle(optionsAudiochallenge); //! перемешиваю объекты-опции, иначе правильный вариант всегда первый

        const page = drawAudiochallengePage(
            cardsForGame[i].correct.image,
            cardsForGame[i].correct.word,
            cardsForGame[i].correct.audio,
            cardsForGame[i].correct._id,
            optionsAudiochallenge,
            counter,
            counter < 10 ? cardsForGame[i + 1].correct.audio : ''
        );

        allAudiochallengeCards += page;
    }

    return allAudiochallengeCards;
}

export async function contentAudiochallengeWithWrapper(group: string) {
    return `<div class="audiochallenge__slider">
                <div class="audiochallenge__row">
                    ${await renderAudiochallenge(AMOUNT_PAGES_AUDIOCHALLENGE, group, NUMBER_OF_OPTIONS_AUDIOCHALLENGE)}
                    <div class="audiochallenge__results results">

                    </div>
                </div>
            </div>`;
}

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

function drawAudiochallengeOption(wordRussian: string, idWord: string, idCorrectWord: string): string {
    return `<input class="medium-ac__input" type="radio" id="${idWord}" name="list-options" value="${wordRussian}" data-idword="${idWord}" data-idcorrect="${idCorrectWord}">
            <label class="medium-ac__label" for="${idWord}">${wordRussian}</label>`;
}

function drawAudiochallengeList(array: Array<Record<string, string>>, idCorrectWord: string): string {
    let listHtml = '';
    for (let i = 0; i < array.length; i += 1) {
        listHtml += drawAudiochallengeOption(array[i].wordRussian, array[i].idWord, idCorrectWord);
    }
    return listHtml;
}

function drawAudiochallengePage(
    wordImagePath: string,
    wordEnglish: string,
    wordAudioPath: string,
    idCorrectWord: string,
    optionsList: Array<Record<string, string>>,
    counter: number,
    wordAudioPathForVoicing: string
): string {
    return `<div class="audiochallenge__page">
                <div class="audiochallenge__page-wrapper">
                    <div class="audiochallenge__top-ac top-ac">
                        <div class="top-ac__question-card question-card _active" data-idcorrect="${idCorrectWord}">
                            <button class="question-card__audio-btn" data-audiopath="${wordAudioPath}">ЗВУК</button>
                        </div>
                        <div class="top-ac__answer-card answer-card" data-idcorrect="${idCorrectWord}">
                        ${drawAudiochallengeAnswerCard(wordImagePath, wordEnglish, wordAudioPath)}
                        </div>
                    </div>
                    <div class="audiochallenge__medium-ac medium-ac">
                        ${drawAudiochallengeList(optionsList, idCorrectWord)}
                    </div>
                    <div class="audiochallenge__bottom-ac bottom-ac">
                        <button class="bottom-ac__next-btn" data-counter="${counter}" data-idcorrect="${idCorrectWord}"
                                            data-audiopath="${wordAudioPathForVoicing}" disabled>СЛЕДУЮЩЕЕ СЛОВО</button>
                    </div>
                </div>
            </div>`;
}

// console.log(
//     await createUserWord(
//         '62fe0020d755e24640edaabd',
//         '5e9f5ee35eb9e72bc21af6b5',
//         { difficulty: 'easy', optional: { test: 'ttt' } },
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MTUxNDMwNywiZXhwIjoxNjYxNTI4NzA3fQ.MAXY3bcOQR7E6lfwB07jLr5lr-xhXNnShfXn9Ck_lc4'
//     )
// );

// console.log(
//     await getUserAggregatedWordsFiltered(
//         '62fe0020d755e24640edaabd',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MTY4OTU1OSwiZXhwIjoxNjYxNzAzOTU5fQ.V7AI1VCOhr8FQR6JNwpr69ZCjWv_E45dmqvxdnXIHOQ',
//         'easy'
//     )
// );

// console.log(
//     await getRandomWordsWithExcluded(
//         '62fe0020d755e24640edaabd',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MTY4OTU1OSwiZXhwIjoxNjYxNzAzOTU5fQ.V7AI1VCOhr8FQR6JNwpr69ZCjWv_E45dmqvxdnXIHOQ',
//         'easy',
//         '0',
//         '600',
//         '9'
//     )
// );

// console.log(
//     await getRandomCardsAudiochallengeWithExcluded(
//         '62fe0020d755e24640edaabd',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MTUxNDMwNywiZXhwIjoxNjYxNTI4NzA3fQ.MAXY3bcOQR7E6lfwB07jLr5lr-xhXNnShfXn9Ck_lc4',
//         'easy',
//         '10',
//         '0',
//         '5'
//     )
// );

// console.log(await getRandomWords('0', '600', '9'));
