export const rerenderMenu = (authState: string) => {
    const linkTeam = document.querySelector('.link__team');
    const menu = document.querySelector('.header__menu');
    if (authState === 'LogOut') {
        const newLink = document.createElement('li');
        newLink.classList.add('link__statistic');
        newLink.innerHTML = '<a href="" class="nav__link" data-rout="/statistic">Статистика</a>';
        menu?.insertBefore(newLink, linkTeam);
    } else if (authState === 'LogIn') {
        const linkStat = document.querySelector('.link__statistic') as HTMLLIElement;
        menu?.removeChild(linkStat);
    }
};
