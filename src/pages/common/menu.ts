import { LOCAL_STORAGE_DATA } from './../../constants/constants';
import './menu.sass';

export const Menu = (): string => {
    const authState = localStorage.getItem(LOCAL_STORAGE_DATA) ? 'LogOut' : 'LogIn';
    const user = localStorage.getItem(LOCAL_STORAGE_DATA);
    const statistic =
        '<li class="link__statistic"><a href="" class="nav__link nav__link_statistic" data-rout="/statistic">Статистика</a></li>';
    const Menu = `<nav class="nav">
    <ul class="header__menu">
        <li><a href="" class="nav__link" data-rout="/">Главная</a></li>
        <li><a href="" class="nav__link" data-rout="/textbook">Учебник</a></li>
        <li><a href="" class="nav__link" data-rout="/games">Игры</a></li>
        ${authState === 'LogOut' ? statistic : ''}
        <li class="link__team"><a href="" class="nav__link" data-rout="/team">О нас</a></li>
        <li><button class="auth" data-username="${user ? JSON.parse(user).name : ''}">${authState}</button></li>
    </ul>
</nav>`;
    return Menu;
};
