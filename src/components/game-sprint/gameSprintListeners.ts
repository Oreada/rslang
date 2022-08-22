import { sprintTimer } from "./gameSprintFunctions";

export function addTimerListener() {
  const target = document.querySelector('.timer-button') as HTMLButtonElement;
  if (!target) {
    return;
  }

  target.addEventListener('click', () => {
    console.log('aaa');
    sprintTimer();
  })
}