import { listenLogon } from './components/modalWindow/logonListener';

import './scss/style.scss';
import './components/api/test-api-functions';

import { Games, GamesCallBack } from './pages/games';
import { Home } from './pages/home';
import { HomePage } from './pages/homePage';
import { Statistic } from './pages/statistic';
import { Team } from './pages/team';
import { Textbook } from './pages/textbook';

import { listenLoginForm } from './components/modalWindow/switchForm';

import { listenersTextbook } from './electronic-textbook/textbookListeners';

type routesKey = keyof typeof routes;

const routes = {
    '/': Home,
    '/textbook': Textbook,
    '/games': Games,
    '/statistic': Statistic,
    '/team': Team,
};

//! это функция-заглушка для страниц, которые не имею коллбэков на данный момент, без неё проблемы с вызовом тут: callbacks[pathname]()
function fooCallback() {
    return true;
}

const callbacks = {
    //! здесь прописываем функции-листенеры для каждой отдельной страницы
    '/': fooCallback,
    '/textbook': listenersTextbook,
    '/games': GamesCallBack,
    '/statistic': fooCallback,
    '/team': fooCallback,
};

const body = document.getElementById('root') as HTMLBodyElement;
const path = window.location.pathname as routesKey;
body.innerHTML = HomePage(routes[path]());
const rootDiv = document.getElementById('main') as HTMLDivElement;

listenLogon();
listenLoginForm();

const links: NodeListOf<HTMLElement> = document.querySelectorAll('.nav__link');
links.forEach((link) => {
    const rout = link.dataset.rout as routesKey;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate(rout);
    });
});

const onNavigate = (pathname: routesKey) => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    rootDiv.innerHTML = routes[pathname]();
    callbacks[pathname](); //! здесь вызываем функции-листенеры для каждой отдельной страницы
};

window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname as routesKey]();
};

// listenersTextbook() - функция, добавляющая слушатели событий для элементов словаря. Позже ее переместим в другое, более подходящее место,
// пока что оставил ее тут, чтоб была возможность у всех проверять работу словаря

// listenersTextbook();
