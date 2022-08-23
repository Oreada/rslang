import { BASE_API, AMOUNT_PAGES_AUDIOCHALLENGE } from '../../constants/constants';
import { getWordById } from '../../components/api/api';
import { getRandomIdWord } from '../../general-functions/random';
import { shuffle } from '../../general-functions/shuffle';
import { IWord } from '../../types/types';

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

async function getOptionsIdList(idMainWord: string, group: string) {
    const optionsIds = [];

    optionsIds.push(idMainWord);

    for (let i = 0; i < 4; i += 1) {
        const idForOption = await getRandomIdWord(group);
        if (!optionsIds.includes(idForOption)) {
            optionsIds.push(idForOption);
        }
    }

    shuffle(optionsIds);
    return optionsIds;
}

async function getWordsListForOptions(idMainWord: string, group: string): Promise<Array<IWord>> {
    const wordsForOptions = [];

    const optionsIds = await getOptionsIdList(idMainWord, group);

    for (let i = 0; i < optionsIds.length; i += 1) {
        const word = await getWordById(optionsIds[i]);
        wordsForOptions.push(word);
    }

    return wordsForOptions;
}

async function getOptionsValueList(idMainWord: string, group: string) {
    const optionsAudiochallenge = [];

    const wordsForOptions = await getWordsListForOptions(idMainWord, group);

    for (let i = 0; i < wordsForOptions.length; i += 1) {
        const option = { wordRussian: wordsForOptions[i].wordTranslate, idWord: wordsForOptions[i].id };
        optionsAudiochallenge.push(option);
    }

    return optionsAudiochallenge;
}

async function renderAudiochallengePage(group: string) {
    const idForMainWord = await getRandomIdWord(group);
    const mainWordAudiochallenge = await getWordById(idForMainWord);
    const optionsAudiochallenge = await getOptionsValueList(idForMainWord, group);

    return drawAudiochallengePage(
        mainWordAudiochallenge.image,
        mainWordAudiochallenge.word,
        mainWordAudiochallenge.audio,
        optionsAudiochallenge
    );
}

export async function renderAudiochallengeSlider(group: string) {
    let allAudiochallengePages = ``;

    for (let i = 0; i < 2; i += 1) {
        const page = await renderAudiochallengePage(group);
        allAudiochallengePages += page;
    }

    return allAudiochallengePages;
}

export async function contentAudiochallengeWithWrapper(group: string) {
    return `<div class="audiochallenge__slider">
                <div class="audiochallenge__row">
                    ${await renderAudiochallengeSlider(group)}
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
