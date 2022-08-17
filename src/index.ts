import './scss/style.scss';
import { createUser, loginUser, getTokenAfterLogin } from './components/api/api';

const objTestForCreate = {
    name: 'Peter Parker',
    email: 'parker@gmail.com',
    password: 'spider666',
};

const objTestForLogin = {
    email: 'parker@gmail.com',
    password: 'spider666',
};

// console.log(createUser(objTestForCreate));
console.log(loginUser(objTestForLogin));
// console.log(await getTokenAfterLogin(objTestForLogin));
