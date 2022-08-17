import './scss/style.scss';
import { createUser, loginUser, getUser, updateUser, deleteUser } from './components/api/api';

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
