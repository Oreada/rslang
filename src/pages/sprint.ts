import {
    addEndSprintListener,
    addGameButtonListener,
    addSprintListener,
    addSprintOptionListener,
    addStartSprintListener,
} from '../components/game-sprint/gameSprintListeners';
import { renderSprint } from '../components/game-sprint/renderSprintGame';
import { drawGroupSelectionPage } from '../components/games-group-selection/group-selection';
import { sprintStorage, storage } from '../storage/storage';

export const SprintContent = (): string => {
    // return renderSprint();
    return drawGroupSelectionPage('sprint');
};

export const SprintContent1 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 0
    sprintStorage.currentChapter = '0';
    return renderSprint();
};

export const SprintContent2 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 1
    sprintStorage.currentChapter = '1';
    return renderSprint();
};

export const SprintContent3 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 2
    sprintStorage.currentChapter = '2';
    return renderSprint();
};

export const SprintContent4 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 3
    sprintStorage.currentChapter = '3';
    return renderSprint();
};

export const SprintContent5 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 4
    sprintStorage.currentChapter = '4';
    return renderSprint();
};

export const SprintContent6 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 5
    sprintStorage.currentChapter = '5';
    return renderSprint();
};

export const SprintTextbookContent1 = (): string => {
  sprintStorage.currentChapter = storage.chapterCount;
  sprintStorage.currentPage = storage.pageCount;
  return renderSprint();
};

export const SprintTextbookContent2 = (): string => {
  sprintStorage.currentChapter = storage.chapterCount;
  sprintStorage.currentPage = storage.pageCount;
  return renderSprint();
};

export const SprintTextbookContent3 = (): string => {
  sprintStorage.currentChapter = storage.chapterCount;
  sprintStorage.currentPage = storage.pageCount;
  return renderSprint();
};

export const SprintTextbookContent4 = (): string => {
  sprintStorage.currentChapter = storage.chapterCount;
  sprintStorage.currentPage = storage.pageCount;
  return renderSprint();
};

export const SprintTextbookContent5 = (): string => {
  sprintStorage.currentChapter = storage.chapterCount;
  sprintStorage.currentPage = storage.pageCount;
  return renderSprint();
};

export const SprintTextbookContent6 = (): string => {
  sprintStorage.currentChapter = storage.chapterCount;
  sprintStorage.currentPage = storage.pageCount;
  return renderSprint();
};

export const SprintCallback = async () => {
    addStartSprintListener();
    addSprintListener();
    addGameButtonListener();
    addEndSprintListener();
    addSprintOptionListener();
};
