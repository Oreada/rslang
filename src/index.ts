import { listenLogon } from './components/modalWindow/logonListener';
import { Games } from './pages/games';
import { Home } from './pages/home';
import { HomePage } from './pages/homePage';
import { Statistic } from './pages/statistic';
import { Team } from './pages/team';
import { Textbook } from './pages/textbook';
import './scss/style.scss';
import { createUser, loginUser, getUser, updateUser, deleteUser } from './components/api/api';
import { listenLoginForm } from './components/modalWindow/switchForm';

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
};

window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname as routesKey]();
};

const objTestForCreate = {
    name: 'Tony Stark',
    email: 'stark@gmail.com',
    password: '123456789',
};

const objTestForLogin = {
    email: 'stark@gmail.com',
    password: '123456789',
};

const objTestForUpdate = {
    name: '',
    email: '',
    password: '',
};

// const creationResult = await createUser(objTestForCreate); //! пример создания юзера
// console.log(creationResult);
// const userId = creationResult?.id as string;

const authResultObj = await loginUser(objTestForLogin); //! пример авторизации юзера
console.log(authResultObj);
const token = authResultObj?.token as string;

// console.log(await getUser(userId, token)); //! пример получения юзера

// console.log(await updateUser(userId, token, objTestForUpdate)); //! пример редактирования юзера

// console.log(await deleteUser(userId, token)); //! пример удаления юзера
