import { BASE_API } from '../../constants/constants';
import {
    IWord,
    IUserBodyForCreation,
    IUserCardWithId,
    IUserBodyForSignIn,
    IAuthorizationResult,
} from '../../types/types';

//! Get a chunk of words certain GROUP and PAGE
export async function getWords(group: string, page: string): Promise<Array<IWord>> {
    const response = await fetch(`${BASE_API}/words?group=${group}&page=${page}`);
    const wordsList = await response.json();
    return wordsList;
}

//! Get a word with assets by ID
export async function getWordById(id: string): Promise<IWord> {
    const response = await fetch(`${BASE_API}/words/${id}`);
    const wordById = await response.json();
    return wordById;
}

//! Create a new user with Request body (OBJ)
//! в документации - возврат name, email, password, на деле вместо password - id
export async function createUser(obj: IUserBodyForCreation): Promise<IUserCardWithId | undefined> {
    const response = await fetch(`${BASE_API}/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    try {
        const newUser = await response.json();
        return newUser;
    } catch (error) {
        if (response.status == 417) {
            console.log('User with this e-mail already exists');
        } else if (response.status == 422) {
            //! один статус на оба случая: и на невалидный имэйл, и на короткий пароль
            console.log(
                'Incorrect e-mail or password: 1) Email must be valid. 2) Password length must be at least 8 characters long'
            );
        } else {
            console.log('Some error');
        }
    }
}

//! Login a user and return an object with token
//! сохранить результат вызова в объект, а потом из него вытягивать токен и т.д.
export async function loginUser(obj: IUserBodyForSignIn): Promise<IAuthorizationResult | undefined> {
    try {
        const response = await fetch(`${BASE_API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        const authUser = await response.json();
        return authUser;
    } catch (error) {
        console.log('Incorrect e-mail or password');
    }
}

// //! Токен нельзя так получать, т.к. при каждом запуске loginUser токен обновляется
// export async function getTokenAfterLogin(obj: UserBodyForSignIn) {
//     const authUser = await loginUser(obj);
//     return authUser?.token;
// }

//! Get user by ID and TOKEN
//! в документации - возврат name, email, password, на деле вместо password - id
export async function getUser(id: string, token: string): Promise<IUserCardWithId | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    try {
        const user = await response.json();
        return user;
    } catch (error) {
        if (response.status == 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status == 404) {
            console.log('User not found');
        } else {
            console.log('Some error');
        }
    }
}

//! Update user by ID and TOKEN (you can change user's "name", "email", "password")
//! в документации - возврат name, email, password, на деле вместо password - id
export async function updateUser(
    id: string,
    token: string,
    obj: IUserBodyForCreation
): Promise<IUserCardWithId | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
    });
    try {
        const userUpdated = await response.json();
        return userUpdated;
    } catch (error) {
        if (response.status == 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status == 400) {
            console.log('Bad request');
        } else {
            console.log('Some error');
        }
    }
}

//! Delete a user by ID and TOKEN
export async function deleteUser(id: string, token: string) {
    const response = await fetch(`${BASE_API}/users/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status === 204) {
        console.log('The user has been deleted successfully');
    }
    if (response.status === 401) {
        console.log('User not found');
    }
}
