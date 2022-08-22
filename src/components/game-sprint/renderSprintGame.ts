export function renderSprintTimer(count: number): string {
  const str = `<div class="sprint-timer-container">
    <div class="sprint-timer-counter">${count}</div>
  </div>`;

  return str;
}

export function renderSprintGame(): string {
  const str = `<section class="sprint-container sprint-hidden">
    <div class="sprint-timer">
    </div>
    <div class="sprint-main">
      <div class="sprint-score">
        <button class="timer-button">Старт таймера</button>
      </div>
      <div class="sprint-progress">
      </div>
      <div class="sprint-game">
        <div class="sprint-words-container">
          <div class="sprint-word">
          </div>
          <div class="sprint-translation">
          </div>
        </div>
        <div class="sprint-buttons-container">
          <button class="sprint-button sprint-true-button" data-correctly="true">Верно</button>
          <button class="sprint-button sprint-false-button" data-correctly="false">Неверно</button>
        </div>
      </div>
    </div>
  </section>`;

  return str;
}