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
} from './pages/audiochallenge';
import { GamesContent, GamesCallback } from './pages/games';
import { Home } from './pages/home';
import { HomePage } from './pages/homePage';
import { Statistic } from './pages/statistic';
import { Team } from './pages/team';
import { Textbook, TextbookCallback } from './pages/textbook';
import { SprintContent, SprintCallback } from './pages/sprint';

import { listenLoginForm } from './components/modalWindow/switchForm';

import { listenersTextbook } from './electronic-textbook/textbookListeners';
import { listenAuth } from './components/modalWindow/authListener';

type routesKey = keyof typeof routes;

const routes = {
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
    '/statistic': Statistic,
    '/team': Team,
};

//! это функция-заглушка для страниц, которые не имеют коллбэков на данный момент, без неё проблемы с вызовом тут: callbacks[pathname]()
function fooCallback() {
    return true;
}

const callbacks = {
    //! здесь прописываем функции-листенеры для каждой отдельной страницы
    '/': fooCallback,
    '/textbook': TextbookCallback,
    '/games': GamesCallback,
    '/games/audiochallenge': fooCallback,
    '/games/audiochallenge/1': AudiochallengeCallback,
    '/games/audiochallenge/2': AudiochallengeCallback,
    '/games/audiochallenge/3': AudiochallengeCallback,
    '/games/audiochallenge/4': AudiochallengeCallback,
    '/games/audiochallenge/5': AudiochallengeCallback,
    '/games/audiochallenge/6': AudiochallengeCallback,
    '/games/sprint': SprintCallback,
    '/statistic': fooCallback,
    '/team': fooCallback,
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
    const rout = link.dataset.rout as routesKey;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate(rout);
    });
});

const onNavigate = async (pathname: routesKey) => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    const content = await routes[pathname]();
    rootDiv.innerHTML = content; //! тут отрисовался определённый контент
    console.log(pathname);
    if (pathname === '/games') {
        const gameLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link.game');
        gameLinks.forEach((link) => {
            const rout = link.dataset.rout as routesKey;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                onNavigate(rout);
            });
        });
    }
    if (pathname === '/games/audiochallenge') {
        const groupLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link.group-selection__link');
        groupLinks.forEach((link) => {
            const rout = link.dataset.rout as routesKey;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                onNavigate(rout);
            });
        });
    }
    callbacks[pathname](); //! здесь навешиваем функции-листенеры для каждой отдельной страницы
};

window.onpopstate = async () => {
    const content = await routes[window.location.pathname as routesKey]();
    rootDiv.innerHTML = content;
};

// listenersTextbook() - функция, добавляющая слушатели событий для элементов словаря. Позже ее переместим в другое, более подходящее место,
// пока что оставил ее тут, чтоб была возможность у всех проверять работу словаря

// listenersTextbook();
