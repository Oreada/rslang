import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { processAudiochallengeResults } from './process-audiochallenge-results';
import { renderResultsPage } from './games-results';
import { processStatistics } from '../statistics/statistics-process';
import { getTodayDate } from '../../general-functions/getTodayDate';
import { countLongestSeries } from '../../general-functions/countLongestSeries';

//* TODO: выяснить: 1) почему Саша использует await, когда получает id и token; 2) нужен ли await тут для этих целей
export async function renderAndProcessAudiochallenge(container: HTMLElement, gameResults: Record<string, string>) {
    await renderResultsPage(container, gameResults);

    const entries = Object.entries(gameResults);
    const correctAnswers = entries.filter((pair) => pair[1] === 'correct');
    const incorrectAnswers = entries.filter((pair) => pair[1] === 'incorrect');
    console.log(entries);

    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;
        console.log('userId in game Audiochallenge =', userId, 'userToken in game Audiochallenge =', userToken);

        await processAudiochallengeResults(userId, userToken, entries);

        const dataForStatistics = {
            latestDate: getTodayDate(),
            totalAnswers: entries.length,
            correctAnswers: correctAnswers.length,
            incorrectAnswers: incorrectAnswers.length,
            bestSeriesOfAnswers: countLongestSeries(entries),
            bestScore: undefined,
        };

        await processStatistics('audiochallenge', dataForStatistics);
    } else {
        console.log('Пользователь не авторизован, результаты игры не сохранятся');
    }
}
