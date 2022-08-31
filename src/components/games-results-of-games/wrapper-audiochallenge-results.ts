import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { processAudiochallengeResults } from './process-audiochallenge-results';
import { renderResultsPage } from './games-results';

//* TODO: выяснить: 1) почему Саша использует await, когда получает id и token; 2) нужен ли await тут для этих целей
export async function renderAndProcessAudiochallenge(container: HTMLElement, gameResults: Record<string, string>) {
    await renderResultsPage(container, gameResults);

    const entries = Object.entries(gameResults);

    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;
        console.log('userId in game Audiochallenge =', userId, 'userToken in game Audiochallenge =', userToken);

        await processAudiochallengeResults(userId, userToken, entries);
    } else {
        console.log('Пользователь не авторизован, результаты игры не сохранятся');
    }
}
