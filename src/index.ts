import { Games } from './pages/games';
import { Home } from './pages/home';
import { HomePage } from './pages/homePage';
import { Statistic } from './pages/statistic';
import { Team } from './pages/team';
import { Textbook } from './pages/textbook';
import './scss/style.scss';

type routesKey = keyof typeof routes;

const routes = {
    '/': Home,
    '/textbook': Textbook,
    '/games': Games,
    '/statistic': Statistic,
    '/team': Team,
};

const body = document.getElementById('root') as HTMLBodyElement;
const path = window.location.pathname as routesKey;
body.innerHTML = HomePage(routes[path]());
const rootDiv = document.getElementById('main') as HTMLDivElement;

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
};

window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname as routesKey]();
};
