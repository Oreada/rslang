import { sprintStorage } from '../../storage/storage';
import { IWord, _IWord } from '../../types/types';
import {
    getPageForSprint,
    getSprintWords,
    getSprintWordsFromPage,
    getStartSprintWords,
    resetSprintProgress,
    sprintTimer,
    updateSprintProgressRender,
    updateSprintProgressState,
} from './gameSprintFunctions';
import { renderSprintGame } from './renderSprintGame';

export function addStartSprintListener() {
    const target = document.querySelector('.sprint-start-button') as HTMLButtonElement;
    const start = document.querySelector('.sprint-start') as HTMLButtonElement;
    const game = document.querySelector('.sprint-game-container') as HTMLElement;
    const gameMain = document.querySelector('.sprint-main') as HTMLElement;
    if (!target || !game || !start || !gameMain) {
        return;
    }

    target.addEventListener('click', async () => {
        await getPageForSprint();
        await getSprintWordsFromPage();
        gameMain.innerHTML = renderSprintGame();
        sprintTimer();
        game.classList.remove('hidden');
        start.classList.add('hidden');
    });
}

export function addSprintListener() {
    const target = document.querySelector('.sprint-button') as HTMLButtonElement;
    const game = document.querySelector('.sprint-game-container') as HTMLElement;
    if (!target || !game) {
        return;
    }

    target.addEventListener('click', async () => {
        console.log('aaa');
    });
}

export function addGameButtonListener() {
    const target = document.querySelectorAll('.sprint-button') as NodeListOf<HTMLButtonElement>;
    const game = document.querySelector('.sprint-main') as HTMLElement;
    if (!target || !game) {
        return;
    }

    target.forEach((item) => {
        item.addEventListener('click', async () => {
            const id1 = (sprintStorage.originWord as _IWord)._id;
            const id2 = (sprintStorage.translateWord as _IWord)._id;

            const isCorrect: string = (id1 === id2).toString();

            if (isCorrect === item.dataset.correctly) {
                sprintStorage.currentScore += sprintStorage.scoreDecrease;
                sprintStorage.levelProgress += 1;
                sprintStorage.gameResult[id1] = 'correct';
            } else {
                resetSprintProgress();
                sprintStorage.gameResult[id1] = 'incorrect';
            }

            await getSprintWordsFromPage();

            console.log(sprintStorage.gameSource);
            console.log(
                sprintStorage.originWord?.word,
                sprintStorage.translateWord?.word,
                sprintStorage.currentPageWords?.length
            );

            updateSprintProgressState();

            game.innerHTML = renderSprintGame();
            updateSprintProgressRender();
        });
    });
}

export function addEndSprintListener() {
    const start = document.querySelector('.sprint-start') as HTMLButtonElement;
    const result = document.querySelector('.sprint-result-container') as HTMLElement;
    if (!result || !start) {
        return;
    }

    result.addEventListener('click', (event: Event) => {
        if (
            (event.target as HTMLButtonElement).classList.contains('results__end-btn') ||
            (event.target as HTMLButtonElement).classList.contains('sprint-result-button')
        ) {
            start.classList.remove('hidden');
            result.classList.add('hidden');
        }
    });
}

export function addSprintOptionListener() {
    const target = document.querySelectorAll('.sprint-group-option') as NodeListOf<HTMLOptionElement>;
    if (!target) {
        return;
    }

    target.forEach((item) => {
        item.addEventListener('click', () => {
            sprintStorage.currentChapter = item.value;
            sprintStorage.currentPage = '0';
        });
    });
}
