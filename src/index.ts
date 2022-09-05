import { listenLogon } from './components/modalWindow/logonListener';

import './scss/style.scss';
import './components/api/test-api-functions';

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
    '/rslang/': Home,
    '/rslang/textbook': Textbook,
    '/rslang/games': GamesContent,
    '/rslang/games/audiochallenge': AudiochallengeContent,
    '/rslang/games/audiochallenge/1': AudiochallengeContent1,
    '/rslang/games/audiochallenge/2': AudiochallengeContent2,
    '/rslang/games/audiochallenge/3': AudiochallengeContent3,
    '/rslang/games/audiochallenge/4': AudiochallengeContent4,
    '/rslang/games/audiochallenge/5': AudiochallengeContent5,
    '/rslang/games/audiochallenge/6': AudiochallengeContent6,
    '/rslang/games/sprint': SprintContent,
    '/rslang/games/sprint/1': SprintContent1,
    '/rslang/games/sprint/2': SprintContent2,
    '/rslang/games/sprint/3': SprintContent3,
    '/rslang/games/sprint/4': SprintContent4,
    '/rslang/games/sprint/5': SprintContent5,
    '/rslang/games/sprint/6': SprintContent6,
    '/rslang/textbook/audiochallenge/1': AudiochallengeTextbookContent1,
    '/rslang/textbook/audiochallenge/2': AudiochallengeTextbookContent2,
    '/rslang/textbook/audiochallenge/3': AudiochallengeTextbookContent3,
    '/rslang/textbook/audiochallenge/4': AudiochallengeTextbookContent4,
    '/rslang/textbook/audiochallenge/5': AudiochallengeTextbookContent5,
    '/rslang/textbook/audiochallenge/6': AudiochallengeTextbookContent6,
    '/rslang/textbook/sprint/1': SprintTextbookContent1,
    '/rslang/textbook/sprint/2': SprintTextbookContent2,
    '/rslang/textbook/sprint/3': SprintTextbookContent3,
    '/rslang/textbook/sprint/4': SprintTextbookContent4,
    '/rslang/textbook/sprint/5': SprintTextbookContent5,
    '/rslang/textbook/sprint/6': SprintTextbookContent6,
    '/rslang/statistic': Statistic,
    '/rslang/team': Team,
};

//! это функция-заглушка для страниц, которые не имеют коллбэков на данный момент, без неё проблемы с вызовом тут: callbacks[pathname]()
function fooCallback() {
    return true;
}

const callbacks = {
    //! здесь прописываем функции-листенеры для каждой отдельной страницы
    '/rslang/': HomeCallback,
    '/rslang/textbook': TextbookCallback,
    '/rslang/games': GamesCallback,
    '/rslang/games/audiochallenge': fooCallback,
    '/rslang/games/audiochallenge/1': AudiochallengeCallback,
    '/rslang/games/audiochallenge/2': AudiochallengeCallback,
    '/rslang/games/audiochallenge/3': AudiochallengeCallback,
    '/rslang/games/audiochallenge/4': AudiochallengeCallback,
    '/rslang/games/audiochallenge/5': AudiochallengeCallback,
    '/rslang/games/audiochallenge/6': AudiochallengeCallback,
    '/rslang/games/sprint': fooCallback,
    '/rslang/games/sprint/1': SprintCallback,
    '/rslang/games/sprint/2': SprintCallback,
    '/rslang/games/sprint/3': SprintCallback,
    '/rslang/games/sprint/4': SprintCallback,
    '/rslang/games/sprint/5': SprintCallback,
    '/rslang/games/sprint/6': SprintCallback,
    '/rslang/textbook/audiochallenge/1': AudiochallengeCallback,
    '/rslang/textbook/audiochallenge/2': AudiochallengeCallback,
    '/rslang/textbook/audiochallenge/3': AudiochallengeCallback,
    '/rslang/textbook/audiochallenge/4': AudiochallengeCallback,
    '/rslang/textbook/audiochallenge/5': AudiochallengeCallback,
    '/rslang/textbook/audiochallenge/6': AudiochallengeCallback,
    '/rslang/textbook/sprint/1': SprintCallback,
    '/rslang/textbook/sprint/2': SprintCallback,
    '/rslang/textbook/sprint/3': SprintCallback,
    '/rslang/textbook/sprint/4': SprintCallback,
    '/rslang/textbook/sprint/5': SprintCallback,
    '/rslang/textbook/sprint/6': SprintCallback,
    '/rslang/statistic': StatisticCallback,
    '/rslang/team': fooCallback,
};

const body = document.getElementById('root') as HTMLBodyElement;
const path = window.location.pathname as routesKey;
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
    if (pathname === '/rslang/games') {
        const gameLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link.game');
        gameLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const rout = link.dataset.rout as routesKey;
                e.preventDefault();
                onNavigate(rout);
            });
        });
    }
    if (pathname === '/rslang/games/audiochallenge') {
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
    if (pathname.slice(0, -1) === '/rslang/games/audiochallenge/') {
        const close = document.querySelector('.close');
        close?.addEventListener('click', (e) => {
            e.preventDefault();
            onNavigate('/rslang/games');
        });
    }
    if (pathname === '/rslang/games/sprint') {
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
    if (pathname.slice(0, -1) === '/rslang/games/sprint/') {
        const close = document.querySelector('.close');
        close?.addEventListener('click', (e) => {
            e.preventDefault();
            onNavigate('/rslang/games');
        });
    }
    if (pathname === '/rslang/textbook') {
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

// listenersTextbook() - функция, добавляющая слушатели событий для элементов словаря. Позже ее переместим в другое, более подходящее место,
// пока что оставил ее тут, чтоб была возможность у всех проверять работу словаря

// listenersTextbook();
