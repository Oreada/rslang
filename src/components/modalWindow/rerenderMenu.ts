import { onNavigate, routesKey } from '../..';

export const rerenderMenu = (authState: string) => {
    const linkTeam = document.querySelector('.link__team');
    const menu = document.querySelector('.header__menu');
    if (authState === 'LogOut') {
        const newLink = document.createElement('li');
        newLink.classList.add('link__statistic');
        newLink.innerHTML = '<a href="" class="nav__link nav__link_statistic" data-rout="/statistic">Статистика</a>';
        menu?.insertBefore(newLink, linkTeam);
    } else if (authState === 'LogIn') {
        const linkStat = document.querySelector('.link__statistic') as HTMLLIElement;
        menu?.removeChild(linkStat);
    }
    const linkStatistic = document.querySelector('.nav__link_statistic') as HTMLElement;
    linkStatistic.addEventListener('click', (e) => {
        const rout = linkStatistic.dataset.rout as routesKey;
        e.preventDefault();
        onNavigate(rout);
    });
};
