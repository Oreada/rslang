import { addEndSprintListener, addGameButtonListener, addSprintListener, addSprintOptionListener, addStartSprintListener } from "../components/game-sprint/gameSprintListeners";
import { renderSprint } from "../components/game-sprint/renderSprintGame";

export const SprintContent = (): string => {
  return renderSprint();
};

export const SprintCallback = async () => {
    addStartSprintListener();
    addSprintListener();
    addGameButtonListener();
    addEndSprintListener();
    addSprintOptionListener();
};
