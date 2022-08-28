import './games.sass';

export const GamesContent = () => {
    return `<section class="game__area">
        <div class="game__box">
          <p class="game__description">Тренировка Аудиовызов улучшает твое восприятие речи на слух.</p>
          <span class="material-symbols-outlined">volume_up</span>
          <a href="" class="nav__link game" data-rout="/games/audiochallenge">Audiochallenge</a>
        </div>
        <div class="game__box">
          <p class="game__description">Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд.</p>
          <span class="material-symbols-outlined">timer</span>
          <a href="" class="nav__link game" data-rout="/games/sprint">Sprint</a>
        </div>    
    </section>`;
};

export const GamesCallback = () => {
    // тут будут навешиваться listeners
};
