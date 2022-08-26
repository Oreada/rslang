import { BASE_API } from '../../constants/constants';
import { IWord, ICardAudiochallenge } from '../../types/types';

//! Get an array of random words from GROUP. Array also has a certain lenght (NUM)
export async function getRandomWords(group: string, num: string): Promise<Array<IWord>> {
    const response = await fetch(`${BASE_API}/words/random?group=${group}&num=${num}`);
    const wordsList = await response.json();
    return wordsList;
}

//! Get an array card for Audiochallenge from GROUP with certain number of options (NUM). Array has a certain lenght (AMOUNTCARDS)
export async function getRandomCardsAudiochallenge(
    amountCards: string,
    group: string,
    num: string
): Promise<Array<ICardAudiochallenge>> {
    const response = await fetch(`${BASE_API}/words/random/card/${amountCards}?group=${group}&num=${num}`);
    const cardsList = await response.json();
    return cardsList;
}
