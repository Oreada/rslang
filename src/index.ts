import { listenLogon } from './components/modalWindow/logonListener';

import './scss/style.scss';

import {
    AudiochallengeContent,
    AudiochallengeCallback,
    AudiochallengeContent1,
    AudiochallengeContent2,
    AudiochallengeContent3,
    AudiochallengeContent4,
    AudiochallengeContent5,
    AudiochallengeContent6,
    AudiochallengeTextbookContent1,
    AudiochallengeTextbookContent2,
    AudiochallengeTextbookContent3,
    AudiochallengeTextbookContent4,
    AudiochallengeTextbookContent5,
    AudiochallengeTextbookContent6,
} from './pages/audiochallenge';
import { GamesContent, GamesCallback } from './pages/games';
import { Home, HomeCallback } from './pages/home';
import { HomePage } from './pages/homePage';
import { Statistic, StatisticCallback } from './pages/statistic';
import { Team } from './pages/team';
import { Textbook, TextbookCallback } from './pages/textbook';
import {
    SprintContent,
    SprintCallback,
    SprintContent1,
    SprintContent2,
    SprintContent3,
    SprintContent4,
    SprintContent5,
    SprintContent6,
    SprintTextbookContent1,
    SprintTextbookContent2,
    SprintTextbookContent3,
    SprintTextbookContent4,
    SprintTextbookContent5,
    SprintTextbookContent6,
} from './pages/sprint';

import { listenLoginForm } from './components/modalWindow/switchForm';

// import { listenersTextbook } from './electronic-textbook/textbookListeners';
import { listenAuth } from './components/modalWindow/authListener';

export type routesKey = keyof typeof routes;

export const routes = {
    '/': Home,
    '/textbook': Textbook,
    '/games': GamesContent,
    '/games/audiochallenge': AudiochallengeContent,
    '/games/audiochallenge/1': AudiochallengeContent1,
    '/games/audiochallenge/2': AudiochallengeContent2,
    '/games/audiochallenge/3': AudiochallengeContent3,
    '/games/audiochallenge/4': AudiochallengeContent4,
    '/games/audiochallenge/5': AudiochallengeContent5,
    '/games/audiochallenge/6': AudiochallengeContent6,
    '/games/sprint': SprintContent,
    '/games/sprint/1': SprintContent1,
    '/games/sprint/2': SprintContent2,
    '/games/sprint/3': SprintContent3,
    '/games/sprint/4': SprintContent4,
    '/games/sprint/5': SprintContent5,
    '/games/sprint/6': SprintContent6,
    '/textbook/audiochallenge/1': AudiochallengeTextbookContent1,
    '/textbook/audiochallenge/2': AudiochallengeTextbookContent2,
    '/textbook/audiochallenge/3': AudiochallengeTextbookContent3,
    '/textbook/audiochallenge/4': AudiochallengeTextbookContent4,
    '/textbook/audiochallenge/5': AudiochallengeTextbookContent5,
    '/textbook/audiochallenge/6': AudiochallengeTextbookContent6,
    '/textbook/sprint/1': SprintTextbookContent1,
    '/textbook/sprint/2': SprintTextbookContent2,
    '/textbook/sprint/3': SprintTextbookContent3,
    '/textbook/sprint/4': SprintTextbookContent4,
    '/textbook/sprint/5': SprintTextbookContent5,
    '/textbook/sprint/6': SprintTextbookContent6,
    '/statistic': Statistic,
    '/team': Team,
};

//! это функция-заглушка для страниц, которые не имеют коллбэков на данный момент, без неё проблемы с вызовом тут: callbacks[pathname]()
function fooCallback() {
    return true;
}

const callbacks = {
    //! здесь прописываем функции-листенеры для каждой отдельной страницы
    '/': HomeCallback,
    '/textbook': TextbookCallback,
    '/games': GamesCallback,
    '/games/audiochallenge': fooCallback,
    '/games/audiochallenge/1': AudiochallengeCallback,
    '/games/audiochallenge/2': AudiochallengeCallback,
    '/games/audiochallenge/3': AudiochallengeCallback,
    '/games/audiochallenge/4': AudiochallengeCallback,
    '/games/audiochallenge/5': AudiochallengeCallback,
    '/games/audiochallenge/6': AudiochallengeCallback,
    '/games/sprint': fooCallback,
    '/games/sprint/1': SprintCallback,
    '/games/sprint/2': SprintCallback,
    '/games/sprint/3': SprintCallback,
    '/games/sprint/4': SprintCallback,
    '/games/sprint/5': SprintCallback,
    '/games/sprint/6': SprintCallback,
    '/textbook/audiochallenge/1': AudiochallengeCallback,
    '/textbook/audiochallenge/2': AudiochallengeCallback,
    '/textbook/audiochallenge/3': AudiochallengeCallback,
    '/textbook/audiochallenge/4': AudiochallengeCallback,
    '/textbook/audiochallenge/5': AudiochallengeCallback,
    '/textbook/audiochallenge/6': AudiochallengeCallback,
    '/textbook/sprint/1': SprintCallback,
    '/textbook/sprint/2': SprintCallback,
    '/textbook/sprint/3': SprintCallback,
    '/textbook/sprint/4': SprintCallback,
    '/textbook/sprint/5': SprintCallback,
    '/textbook/sprint/6': SprintCallback,
    '/statistic': StatisticCallback,
    '/team': fooCallback,
};

const body = document.getElementById('root') as HTMLBodyElement;
export const path = window.location.pathname as routesKey;
const content = await routes[path]();
body.innerHTML = HomePage(content);
const rootDiv = document.getElementById('main') as HTMLDivElement;
callbacks[path](); //! тут тоже вызываю, чтобы эти коллбэки работали после перезагрузки страницы

listenLogon();
listenLoginForm();
listenAuth();

const links: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link');
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        const rout = link.dataset.rout as routesKey;
        e.preventDefault();
        onNavigate(rout);
    });
});

export const onNavigate = async (pathname: routesKey) => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    const content = await routes[pathname]();
    rootDiv.innerHTML = content; //! тут отрисовался определённый контент
    if (pathname === '/games') {
        const gameLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link.game');
        gameLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const rout = link.dataset.rout as routesKey;
                e.preventDefault();
                onNavigate(rout);
            });
        });
    }
    if (pathname === '/games/audiochallenge') {
        const groupLinks: NodeListOf<HTMLElement> = document.querySelectorAll(
            '.nav__link.group-selection__link-audiochallenge'
        );
        groupLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const rout = link.dataset.rout as routesKey;
                e.preventDefault();
                onNavigate(rout);
            });
        });
    }
    if (pathname.slice(0, -1) === '/games/audiochallenge/') {
        const close = document.querySelector('.close');
        close?.addEventListener('click', (e) => {
            e.preventDefault();
            onNavigate('/games');
        });
    }
    if (pathname === '/games/sprint') {
        const groupLinks: NodeListOf<HTMLElement> = document.querySelectorAll(
            '.nav__link.group-selection__link-sprint'
        );
        groupLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const rout = link.dataset.rout as routesKey;
                e.preventDefault();
                onNavigate(rout);
            });
        });
    }
    if (pathname.slice(0, -1) === '/games/sprint/') {
        const close = document.querySelector('.close');
        close?.addEventListener('click', (e) => {
            e.preventDefault();
            onNavigate('/games');
        });
    }
    if (pathname === '/textbook') {
        const groupLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link.textbook__game-link');
        groupLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const buttonGame = document.querySelector('.audio-game-btn') as HTMLButtonElement;
                if (!buttonGame.disabled) {
                    const rout = link.dataset.rout as routesKey;
                    onNavigate(rout);
                }
            });
        });
    }
    callbacks[pathname](); //! здесь навешиваем функции-листенеры для каждой отдельной страницы
};

window.onpopstate = async () => {
    const content = await routes[window.location.pathname as routesKey]();
    rootDiv.innerHTML = content;
    // location.reload(); // TODO вернуться к window.location.pathnam. Сейчас при back/forward теряются listeners поэтому справляемся перезагрузкой.
};
