import { addTimerListener } from "../components/game-sprint/gameSprintListeners";
import { renderSprintGame } from "../components/game-sprint/renderSprintGame";

export const SprintContent = (): string => {
    return renderSprintGame();
};

export const SprintCallback = () => {
    addTimerListener();
};
