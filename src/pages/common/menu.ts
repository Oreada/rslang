import { LOCAL_STORAGE_DATA } from './../../constants/constants';
import './menu.sass';

export const Menu = (): string => {
    const authState = localStorage.getItem(LOCAL_STORAGE_DATA) ? 'LogOut' : 'LogIn';
    const user = localStorage.getItem(LOCAL_STORAGE_DATA);
    const Menu = `<nav class="nav">
    <ul class="menu">
        <li><a href="" class="nav__link" data-rout="/">Главная</a></li>
        <li><a href="" class="nav__link" data-rout="/textbook">Учебник</a></li>
        <li><a href="" class="nav__link" data-rout="/games">Игры</a></li>
        <li><a href="" class="nav__link" data-rout="/audiochallenge">Аудиовызов</a></li>
        <li><a href="" class="nav__link" data-rout="/sprint">Спринт</a></li>
        <li><a href="" class="nav__link" data-rout="/statistic">Статистика</a></li>
        <li><a href="" class="nav__link" data-rout="/team">О нас</a></li>
        <li><button class="auth" data-username="${user ? JSON.parse(user).name : ''}">${authState}</button></li>
    </ul>
</nav>`;
    return Menu;
};
