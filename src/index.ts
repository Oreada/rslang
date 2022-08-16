import './scss/style.scss';
import { createUser } from './components/api/api';

const objTest = {
    name: 'Peter Parker',
    email: 'parker@gmail.com',
    password: 'spider666',
};

console.log(createUser(objTest));
