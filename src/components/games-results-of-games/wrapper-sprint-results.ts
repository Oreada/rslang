import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { renderResultsPage } from './games-results';
import { processSprintResults } from './process-sprint-results';

type TFunc = {
    (): void;
};

//* TODO: выяснить: 1) почему Саша использует await, когда получает id и token; 2) нужен ли await тут для этих целей
export async function renderAndProcessSprint(
    container: HTMLElement,
    gameResults: Record<string, string>,
    showContainer: TFunc
) {
    await renderResultsPage(container, gameResults);

    showContainer();

    const entries = Object.entries(gameResults);

    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;
        console.log('userId in game Sprint =', userId, 'userToken in game Sprint =', userToken);

        await processSprintResults(userId, userToken, entries);
    } else {
        console.log('Пользователь не авторизован, результаты игры не сохранятся');
    }
}
