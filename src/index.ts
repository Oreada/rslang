import { LOCAL_STORAGE_DATA } from './constants/constants';
import { listenLogon } from './components/modalWindow/logonListener';

import './scss/style.scss';
import './components/api/test-api-functions';

import { AudiochallengeContent, AudiochallengeCallback } from './pages/audiochallenge';
import { GamesContent, GamesCallback } from './pages/games';
import { Home } from './pages/home';
import { HomePage } from './pages/homePage';
import { Statistic } from './pages/statistic';
import { Team } from './pages/team';
import { Textbook, TextbookCallback } from './pages/textbook';
import { SprintContent, SprintCallback } from './pages/sprint';

import { listenLoginForm } from './components/modalWindow/switchForm';

import { listenersTextbook } from './electronic-textbook/textbookListeners';
import { getAllUserWords } from './components/api/api';
import { listenAuth } from './components/modalWindow/authListener';

type routesKey = keyof typeof routes;

const routes = {
    '/': Home,
    '/textbook': Textbook,
    '/games': GamesContent,
    '/audiochallenge': AudiochallengeContent,
    '/sprint': SprintContent,
    '/statistic': Statistic,
    '/team': Team,
};

//! это функция-заглушка для страниц, которые не имеют коллбэков на данный момент, без неё проблемы с вызовом тут: callbacks[pathname]()
function fooCallback() {
    const test = document.querySelector('.test');
    test?.addEventListener('click', () => {
        console.log(
            getAllUserWords(
                JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId,
                JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token
            )
        );
    });
    return true;
}

const callbacks = {
    //! здесь прописываем функции-листенеры для каждой отдельной страницы
    '/': fooCallback,
    '/textbook': TextbookCallback,
    '/games': GamesCallback,
    '/audiochallenge': AudiochallengeCallback,
    '/sprint': SprintCallback,
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
    callbacks[pathname](); //! здесь навешиваем функции-листенеры для каждой отдельной страницы
};

window.onpopstate = async () => {
    const content = await routes[window.location.pathname as routesKey]();
    rootDiv.innerHTML = content;
};

// listenersTextbook() - функция, добавляющая слушатели событий для элементов словаря. Позже ее переместим в другое, более подходящее место,
// пока что оставил ее тут, чтоб была возможность у всех проверять работу словаря

// listenersTextbook();
