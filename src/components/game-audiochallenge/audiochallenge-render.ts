import {
    BASE_API,
    AMOUNT_CARDS_AUDIOCHALLENGE,
    NUMBER_OF_OPTIONS_AUDIOCHALLENGE,
    LOCAL_STORAGE_DATA,
    AMOUNT_CARDS_AUDIOCHALLENGE_TEXTBOOK,
} from '../../constants/constants';
import { getRandomCardsAudiochallenge, getRandomCardsAudiochallengeWithExcluded } from '../api/api-games';
import { shuffle } from '../../general-functions/shuffle';

import { ICardAudiochallenge } from '../../types/types';

import { Modal } from '../modalWindow/modal';

export function playWordAudioForGame(event: Event) {
    const targetButton = event.currentTarget as HTMLButtonElement;
    if (
        targetButton.classList.contains('answer-card__audio-btn') ||
        targetButton.classList.contains('question-card__audio-btn') ||
        targetButton.classList.contains('correct-list__audio-btn') ||
        targetButton.classList.contains('incorrect-list__audio-btn')
    ) {
        const path = `${BASE_API}/${targetButton.dataset.audiopath as string}`;
        const audio = new Audio(path);
        (audio as HTMLAudioElement).play();
    }
}

//! =====================================================================================================================

export async function renderAudiochallengeTextbook(
    amountCards: string,
    group: string,
    num: string,
    page = '-1'
): Promise<string> {
    let counter = 0;
    let allAudiochallengeCards = ``;

    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    let cardsForGame;
    if (isAuthorized) {
        const userId = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;
        cardsForGame = (await getRandomCardsAudiochallengeWithExcluded(
            userId,
            userToken,
            'easy',
            amountCards,
            group,
            num,
            page
        )) as ICardAudiochallenge[];
    } else {
        cardsForGame = await getRandomCardsAudiochallenge(amountCards, group, num, page);
    }

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

        shuffle(optionsAudiochallenge); //! ?????????????????????? ??????????????-??????????, ?????????? ???????????????????? ?????????????? ???????????? ????????????

        const page = drawAudiochallengePage(
            cardsForGame[i].correct.image,
            cardsForGame[i].correct.word,
            cardsForGame[i].correct.audio,
            cardsForGame[i].correct._id,
            optionsAudiochallenge,
            counter,
            counter < cardsForGame.length ? cardsForGame[i + 1].correct.audio : '',
            counter === cardsForGame.length ? 'last-card' : ''
        );

        allAudiochallengeCards += page;
    }

    return allAudiochallengeCards;
}

export async function renderAudiochallenge(
    amountCards: string,
    group: string,
    num: string,
    page = '-1'
): Promise<string> {
    let counter = 0;
    let allAudiochallengeCards = ``;

    const cardsForGame = await getRandomCardsAudiochallenge(amountCards, group, num, page);

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

        shuffle(optionsAudiochallenge); //! ?????????????????????? ??????????????-??????????, ?????????? ???????????????????? ?????????????? ???????????? ????????????

        const page = drawAudiochallengePage(
            cardsForGame[i].correct.image,
            cardsForGame[i].correct.word,
            cardsForGame[i].correct.audio,
            cardsForGame[i].correct._id,
            optionsAudiochallenge,
            counter,
            counter < cardsForGame.length ? cardsForGame[i + 1].correct.audio : '',
            counter === cardsForGame.length ? 'last-card' : ''
        );

        allAudiochallengeCards += page;
    }

    return allAudiochallengeCards;
}

export async function contentAudiochallengeWithWrapperTextbook(group: string, page = '-1') {
    const content = `
    <div class="audiochallenge__slider">
        <div class="audiochallenge__row">
    ${await renderAudiochallengeTextbook(
        AMOUNT_CARDS_AUDIOCHALLENGE_TEXTBOOK,
        group,
        NUMBER_OF_OPTIONS_AUDIOCHALLENGE,
        page
    )}
        <div class="audiochallenge__results results"></div>
        </div>
    </div>
    `;
    return Modal(content);
}

export async function contentAudiochallengeWithWrapper(group: string, page = '-1') {
    const content = `
    <div class="audiochallenge__slider">
        <div class="audiochallenge__row">
            ${await renderAudiochallenge(AMOUNT_CARDS_AUDIOCHALLENGE, group, NUMBER_OF_OPTIONS_AUDIOCHALLENGE, page)}
            <div class="audiochallenge__results results"></div>
        </div>
    </div>
    `;
    return Modal(content);
}

//! =====================================================================================================================

function drawAudiochallengeAnswerCard(wordImagePath: string, wordEnglish: string, wordAudioPath: string): string {
    return `<div class="answer-card__picture">
                <img src="${BASE_API}/${wordImagePath}" alt="Image" class="answer-card__image">
            </div>
            <div class="answer-card__value">
                <button class="answer-card__audio-btn" data-audiopath="${wordAudioPath}">
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
                <div class="answer-card__text">${wordEnglish}</div>
            </div>`;
}

function drawAudiochallengeOption(wordRussian: string, idWord: string, idCorrectWord: string, counter: number): string {
    return `<input class="medium-ac__input" type="radio" id="${idWord}" name="list-options" value="${wordRussian}" data-idword="${idWord}" data-idcorrect="${idCorrectWord}">
            <label class="medium-ac__label" for="${idWord}">${counter + 1} ${wordRussian}</label>`;
}

function drawAudiochallengeList(array: Array<Record<string, string>>, idCorrectWord: string): string {
    let listHtml = '';
    for (let i = 0; i < array.length; i += 1) {
        listHtml += drawAudiochallengeOption(array[i].wordRussian, array[i].idWord, idCorrectWord, i);
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
    wordAudioPathForVoicing: string,
    markForLastPage: string
): string {
    return `<div class="audiochallenge__page" data-pageNumber="${counter}">
                <div class="audiochallenge__page-wrapper">
                    <div class="audiochallenge__top-ac top-ac">
                        <div class="top-ac__question-card question-card _active" data-idcorrect="${idCorrectWord}">
                            <button class="question-card__audio-btn" data-audiopath="${wordAudioPath}">
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
                        </div>
                        <div class="top-ac__answer-card answer-card" data-idcorrect="${idCorrectWord}">
                        ${drawAudiochallengeAnswerCard(wordImagePath, wordEnglish, wordAudioPath)}
                        </div>
                    </div>
                    <div class="audiochallenge__medium-ac medium-ac">
                        ${drawAudiochallengeList(optionsList, idCorrectWord)}
                    </div>
                    <div class="audiochallenge__bottom-ac bottom-ac">
                        <button class="bottom-ac__next-btn" data-mark="${markForLastPage}" data-counter="${counter}"
                        data-idcorrect="${idCorrectWord}" data-audiopath="${wordAudioPathForVoicing}" disabled>?????????????????? ??????????</button>
                    </div>
                </div>
            </div>`;
}
