import { onNavigate, routesKey } from '..';
import './games.sass';

export const GamesContent = () => {
    return `<section class="game__area">
        <div class="game__box" data-rout="/games/audiochallenge">
          <p class="game__description">Тренировка Аудиовызов улучшает твое восприятие речи на слух.</p>
          <img class="game-icon" src="../asset/svg/volume_up.svg" alt="">
          <a href="" class="nav__link game" data-rout="/games/audiochallenge">Audiochallenge</a>
        </div>
        <div class="game__box" data-rout="/games/sprint">
          <p class="game__description">Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд.</p>
          <img class="game-icon" src="../asset/svg/timer.svg" alt="">
          <a href="" class="nav__link game" data-rout="/games/sprint">Sprint</a>
        </div>    
    </section>`;
};

export const GamesCallback = () => {
    const games: NodeListOf<HTMLElement> = document.querySelectorAll('.game__box');
    games.forEach((game) => {
        const rout = game.dataset.rout as routesKey;
        game.addEventListener('click', () => {
            console.log('Вот', rout);
            onNavigate(rout);
        });
    });
};
