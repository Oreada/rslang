import './menu.sass';

export const Menu = (): string => {
    const Menu = `<nav class="nav">
  <ul class="menu">
    <li><a href="" class="nav__link" data-rout="/">Главная</a></li>
    <li><a href="" class="nav__link" data-rout="/textbook">Учебник</a></li>
    <li><a href="" class="nav__link" data-rout="/games">Игры</a></li>
    <li><a href="" class="nav__link" data-rout="/statistic">Статистика</a></li>
    <li><a href="" class="nav__link" data-rout="/team">О нас</a></li>
    <li><button class="auth" data-hystmodal="#myModal">Вход</button></li>
  </ul>
</nav>`;
    return Menu;
};
