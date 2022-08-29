import {
    addEndSprintListener,
    addGameButtonListener,
    addSprintListener,
    addSprintOptionListener,
    addStartSprintListener,
} from '../components/game-sprint/gameSprintListeners';
import { renderSprint } from '../components/game-sprint/renderSprintGame';
import { drawGroupSelectionPage } from '../components/games-group-selection/group-selection';

export const SprintContent = (): string => {
    // return renderSprint();
    return drawGroupSelectionPage('sprint');
};

export const SprintContent1 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 0
    return '';
};

export const SprintContent2 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 1
    return '';
};

export const SprintContent3 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 2
    return '';
};

export const SprintContent4 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 3
    return '';
};

export const SprintContent5 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 4
    return '';
};

export const SprintContent6 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 5
    return '';
};

export const SprintTextbookContent1 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 0
    return '';
};

export const SprintTextbookContent2 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 1
    return '';
};

export const SprintTextbookContent3 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 2
    return '';
};

export const SprintTextbookContent4 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 3
    return '';
};

export const SprintTextbookContent5 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 4
    return '';
};

export const SprintTextbookContent6 = (): string => {
    // твоя функция отрисовки страницы в зависимости от выбранной группы сложности - 5
    return '';
};

export const SprintCallback = async () => {
    addStartSprintListener();
    addSprintListener();
    addGameButtonListener();
    addEndSprintListener();
    addSprintOptionListener();
};
