import { BASE_API } from '../../constants/constants';
import { Word, UserBodyForCreation, UserCardWithId, UserBodyForSignIn, AuthorizationResult } from '../../types/types';

//! Get a chunk of words certain GROUP and PAGE
export async function getWords(group: string, page: string): Promise<Array<Word>> {
    const response = await fetch(`${BASE_API}/words?group=${group}&page=${page}`);
    const wordsList = await response.json();
    return wordsList;
}

//! Get a word with assets by ID
export async function getWordById(id: string): Promise<Word> {
    const response = await fetch(`${BASE_API}/words/${id}`);
    const wordById = await response.json();
    return wordById;
}

//! Create a new user with Request body (OBJ)
export async function createUser(obj: UserBodyForCreation): Promise<UserCardWithId | undefined> {
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
export async function loginUser(obj: UserBodyForSignIn): Promise<AuthorizationResult | undefined> {
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

export async function getTokenAfterLogin(obj: UserBodyForSignIn) {
    const authUser = await loginUser(obj);
    return authUser?.token;
}

//! Get user by ID
// export async function getUserById(id: string): Promise<UserCreation> {
//     const response = await fetch(`${BASE_API}/users/${id}`);
//     console.log(response.status);
//     const userById = await response.json();
//     return userById;
// }
