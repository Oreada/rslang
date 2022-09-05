import { getWords } from '../components/api/api';
import { PAGES_IN_GROUP, WORDS_PER_PAGE } from '../constants/constants';

export function getRandomNumber(upToLimit: number) {
    return Math.floor(Math.random() * upToLimit);
}

export async function getRandomIdWord(groupCertain: string) {
    const pageRandom = String(getRandomNumber(PAGES_IN_GROUP));
    const indexRandom = getRandomNumber(WORDS_PER_PAGE);

    const wordRandom = (await getWords(groupCertain, pageRandom))[indexRandom];
    return wordRandom.id;
}
