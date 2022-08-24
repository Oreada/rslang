//* TODO: разобраться с этими функциями, удалить лишние
import { getWordById } from '../../components/api/api';
import { shuffle } from '../../general-functions/shuffle';
import { getRandomIdWord } from '../../general-functions/random';
import { IWord } from '../../types/types';

export async function getOptionsIdList(idMainWord: string, group: string) {
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

export async function getWordsListForOptions(idMainWord: string, group: string): Promise<Array<IWord>> {
    const wordsForOptions = [];

    const optionsIds = await getOptionsIdList(idMainWord, group);

    for (let i = 0; i < optionsIds.length; i += 1) {
        const word = await getWordById(optionsIds[i]);
        wordsForOptions.push(word);
    }

    return wordsForOptions;
}

export async function getOptionsValueList(idMainWord: string, group: string) {
    const optionsAudiochallenge = [];

    const wordsForOptions = await getWordsListForOptions(idMainWord, group);

    for (let i = 0; i < wordsForOptions.length; i += 1) {
        const option = { wordRussian: wordsForOptions[i].wordTranslate, idWord: wordsForOptions[i].id };
        optionsAudiochallenge.push(option);
    }

    return optionsAudiochallenge;
}

// export async function renderAudiochallengePage(group: string) {
//     const idForMainWord = await getRandomIdWord(group);
//     const mainWordAudiochallenge = await getWordById(idForMainWord);
//     const optionsAudiochallenge = await getOptionsValueList(idForMainWord, group);

//     return drawAudiochallengePage(
//         mainWordAudiochallenge.image,
//         mainWordAudiochallenge.word,
//         mainWordAudiochallenge.audio,
//         optionsAudiochallenge
//     );
// }

// export async function renderAudiochallengeSlider(group: string) {
//     let allAudiochallengePages = ``;

//     for (let i = 0; i < 2; i += 1) {
//         const page = await renderAudiochallengePage(group);
//         allAudiochallengePages += page;
//     }

//     return allAudiochallengePages;
// }
