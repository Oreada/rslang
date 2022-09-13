import { BASE_API } from '../../constants/constants';
import { _IWord, ICardAudiochallenge } from '../../types/types';

//! Get an array of random words from GROUP. Array also has a certain lenght (NUM)
export async function getRandomWords(group: string, num: string, page = '-1'): Promise<Array<_IWord>> {
    //! тут _IWord вместо IWord, т.к. в выводе "_id", а не "id"
    const response = await fetch(`${BASE_API}/words/random?group=${group}&num=${num}&page=${page}`);
    const wordsList = await response.json();
    return wordsList;
}

//! Get an array card for Audiochallenge from GROUP with certain number of options (NUM). Array has a certain lenght (AMOUNTCARDS)
export async function getRandomCardsAudiochallenge(
    amountCards: string,
    group: string,
    num: string,
    page = '-1'
): Promise<Array<ICardAudiochallenge>> {
    const response = await fetch(`${BASE_API}/words/random/card/${amountCards}?group=${group}&num=${num}&page=${page}`);
    const cardsList = await response.json();
    return cardsList;
}

//! Get an array of random words from GROUP - except the easy/hard words() of this user. Array also has a certain lenght (NUM)
export async function getRandomWordsWithExcluded(
    idUser: string,
    token: string,
    excluded: 'easy' | 'hard',
    group: string,
    num: string,
    page = '-1'
): Promise<Array<_IWord> | undefined> {
    //! тут _IWord вместо IWord, т.к. в выводе "_id", а не "id"
    const response = await fetch(
        `${BASE_API}/users/${idUser}/words/random?group=${group}&num=${num}&exclude=${excluded}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    try {
        const wordsListWithExcluded = await response.json();
        return wordsListWithExcluded;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else {
            console.log('Some error');
        }
    }
}

//! Get an array card for Audiochallenge from GROUP - except the easy/hard words() of this user, with certain number of options (NUM).
//! Array has a certain lenght (AMOUNTCARDS)
export async function getRandomCardsAudiochallengeWithExcluded(
    idUser: string,
    token: string,
    excluded: 'easy' | 'hard',
    amountCards: string,
    group: string,
    num: string,
    page = '-1'
): Promise<Array<ICardAudiochallenge> | undefined> {
    const response = await fetch(
        `${BASE_API}/users/${idUser}/words/random/card/${amountCards}?group=${group}&num=${num}&exclude=${excluded}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    try {
        const cardsListWithExcluded = await response.json();
        return cardsListWithExcluded;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else {
            console.log('Some error');
        }
    }
}
