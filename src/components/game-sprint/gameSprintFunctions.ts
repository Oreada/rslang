import { SPRINT_TIMER_LIMIT } from "../../constants/constants";
import { renderSprintTimer } from "./renderSprintGame";

export function sprintTimer() {
  const target = document.querySelector('.sprint-timer') as HTMLElement;
  if (!target) {
    return;
  }

  console.log('eee')

  let timerLimit = SPRINT_TIMER_LIMIT;

  let sprintTimer: null | NodeJS.Timer = null;

  function countdown() {
    console.log('111')
    if (timerLimit <= 0) {
      clearInterval(sprintTimer as NodeJS.Timer);
      return;
    }

    timerLimit -= 1;
    target.innerHTML = renderSprintTimer(timerLimit);
  }

  countdown();
  sprintTimer = setInterval(countdown, 1000);
}