import { getWordById } from '../components/api/api';
import {
    SPRINT_MIN_COEFFICIENT,
    SPRINT_PROGRESS_BARS_QUANTITY,
    STORAGE_IN_LOCAL_STORAGE,
} from '../constants/constants';
import { getRandomIdWord } from '../general-functions/random';
import { ISprintStorage, IStorage } from '../types/types';

// надо импортировать прямо или опосредованно в index.ts при закрытии или перезагрузке страницы сохраняет storage в localStorage
export const listenReload = () => {
    window.addEventListener('unload', () => {
        localStorage.setItem(STORAGE_IN_LOCAL_STORAGE, JSON.stringify(storage));
    });
    document.addEventListener('DOMContentLoaded', () => {
        const savedStorage = getStorage() as IStorage;
        if (!savedStorage) {
            return;
        }
        console.log('storage');
        storage.chapterCount = savedStorage.chapterCount;
        storage.pageCount = savedStorage.pageCount;
        // sprintStorage.currentChapter = savedStorage.chapterCount;
        // sprintStorage.currentPage = savedStorage.pageCount;
    });
};
listenReload();

// возвращает копию storage в виде IStorage
export const getStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_IN_LOCAL_STORAGE) as string);
};

export const storage: IStorage = {
    pageCount: '0',
    chapterCount: '0',
    currentPage: null,
    difficultWords: null,
};

export const sprintStorage: ISprintStorage = {
    currentChapter: '0',
    currentPage: '0',
    originWord: await getWordById(await getRandomIdWord('0')),
    translateWord: await getWordById(await getRandomIdWord('0')),
    level: 0,
    levelProgress: 0,
    levelProgressBar: SPRINT_PROGRESS_BARS_QUANTITY,
    currentScore: 0,
    bestScore: 0,
    scoreDecrease: SPRINT_MIN_COEFFICIENT,
    gameSource: 'menu',
    currentPageWords: null,
    gameResult: {},
};

export const AudioChallengeStorage = {
    currentAudioPage: 1,
};
