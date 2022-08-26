import { BASE_API } from '../../constants/constants';
import {
    IWord,
    IUserBodyForCreation,
    IUserCardWithId,
    IUserBodyForSignIn,
    IAuthorizationResult,
    ITokens,
    IWordUser,
    IUserWordCard,
    IUserWordsAggregated,
    IWordWithDifficulty,
    IStatisticsBodyForPutting,
    IStatisticsResult,
    ISettingsBodyForPutting,
    ISettingsResult,
} from '../../types/types';

//! Get a chunk of words certain GROUP and PAGE
export async function getWords(group: string, page: string): Promise<Array<IWord>> {
    const response = await fetch(`${BASE_API}/words?group=${group}&page=${page}`);
    const wordsList = await response.json();
    return wordsList;
}

//! Get a word with assets by IDWORD
export async function getWordById(idWord: string): Promise<IWord> {
    const response = await fetch(`${BASE_API}/words/${idWord}`);
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
        if (response.status === 417) {
            console.log('User with this e-mail already exists');
        } else if (response.status === 422) {
            //! один статус на оба случая: и на невалидный имэйл, и на короткий пароль
            console.log(
                'Incorrect e-mail or password: 1) Email must be valid. 2) Password length must be at least 8 characters long'
            );
        } else {
            console.log('Some error');
        }
    }
}

//! Login a user with Request body (OBJ)
//* TODO сохранить результат вызова в объект, а потом из него вытягивать токен и т.д.
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
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 404) {
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
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 400) {
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

//! Get new user tokens by ID and REFRESHTOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function getNewToken(id: string, refreshToken: string): Promise<ITokens | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/tokens`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    try {
        const authUser = await response.json();
        return authUser;
    } catch (error) {
        if (response.status === 403) {
            console.log('Access token is missing or invalid');
        } else {
            console.log('Some error');
        }
    }
}

//! Get all user words by ID and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function getAllUserWords(id: string, token: string): Promise<Array<IUserWordCard> | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/words`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    try {
        const wordsUser = await response.json();
        return wordsUser;
    } catch (error) {
        if (response.status === 402) {
            console.log('Access token is missing or invalid');
        } else {
            console.log('Some error');
        }
    }
}

//! Create a user word with Request body (OBJ), by ID, IDWORD and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function createUserWord(
    id: string,
    idWord: string,
    obj: IWordUser,
    token: string
): Promise<IUserWordCard | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/words/${idWord}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
        //* TODO: разобраться, нужна ли эта строка и куда ещё её дописать, если нужна:
        // credentials: 'include',
    });
    try {
        const wordUserCreated = await response.json();
        return wordUserCreated;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 400) {
            console.log('Bad request');
        } else if (response.status === 417) {
            console.log('Such user word already exists');
        } else {
            console.log('Some error');
        }
    }
}

//! Get a user word by ID, IDWORD and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function getUserWord(id: string, idWord: string, token: string): Promise<IUserWordCard | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/words/${idWord}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    try {
        const wordUser = await response.json();
        return wordUser;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 404) {
            console.log("User's word not found");
        } else {
            console.log('Some error');
        }
    }
}

//! Update a user word with Request body (OBJ), by ID, IDWORD and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function updateUserWord(
    id: string,
    idWord: string,
    obj: IWordUser,
    token: string
): Promise<IUserWordCard | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/words/${idWord}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
    });
    try {
        const wordUserUpdated = await response.json();
        return wordUserUpdated;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 400) {
            console.log('Bad request');
        } else if (response.status === 404) {
            console.log('User word not found');
        } else {
            console.log('Some error');
        }
    }
}

//! Delete user words by ID, IDWORD and TOKEN
export async function deleteUserWord(id: string, idWord: string, token: string) {
    const response = await fetch(`${BASE_API}/users/${id}/words/${idWord}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status === 204) {
        console.log('The user word has been deleted successfully');
    }
    if (response.status === 401) {
        console.log('Access token is missing or invalid');
    }
    if (response.status === 400) {
        console.log('Wrong word id');
    }
}

//! Get all user aggregatedWords with filter by ID, TOKEN, FILTER, GROUP, PAGE (of aggregatedWords list), WORDSPERPAGE
export async function getUserAggregatedWordsFiltered(
    id: string,
    token: string,
    filter: 'hard' | 'easy',
    page = '0',
    wordsPerPage = '1000'
): Promise<Array<IUserWordsAggregated> | undefined> {
    const response = await fetch(
        `${BASE_API}/users/${id}/aggregatedWords?page=${page}&wordsPerPage=${wordsPerPage}&filter={"userWord.difficulty":"${filter}"}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    try {
        const wordsUserAggregatedFiltered = await response.json();
        return wordsUserAggregatedFiltered;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else {
            console.log('Some error');
        }
    }
}

//! Get user aggregatedWord by ID, IDWORD and TOKEN
//! расхождения с документацией: апи возвращает Array вместо одного объекта. Дописала [0], чтобы вернуть сам объект
export async function getUserAggregatedWord(
    id: string,
    idWord: string,
    token: string
): Promise<IWordWithDifficulty | undefined> {
    try {
        const response = await fetch(`${BASE_API}/users/${id}/aggregatedWords/${idWord}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const wordUserAggregated = await response.json();
        return wordUserAggregated[0];
    } catch (error) {
        console.log('Some error');
    }
}

//! Get statistics by ID and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function getStatistics(id: string, token: string): Promise<IStatisticsResult | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/statistics`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    try {
        const statistics = await response.json();
        return statistics;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 404) {
            console.log('Statistics not found');
        } else {
            console.log('Some error');
        }
    }
}

//! Putting new statistics with Request body(OBJ), by ID and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function putStatistics(
    id: string,
    token: string,
    obj: IStatisticsBodyForPutting
): Promise<IStatisticsResult | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/statistics`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
    });
    try {
        const statistics = await response.json();
        return statistics;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 400) {
            console.log('Bad request');
        } else {
            console.log('Some error');
        }
    }
}

//! Get settings by ID and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function getSettings(id: string, token: string): Promise<ISettingsResult | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/settings`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    try {
        const settings = await response.json();
        return settings;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 404) {
            console.log('Settings not found');
        } else {
            console.log('Some error');
        }
    }
}

//! Putting new settings with Request body(OBJ), by ID and TOKEN
//! расхождения с документацией относительно полей возвращаемого объекта
export async function putSettings(
    id: string,
    token: string,
    obj: ISettingsBodyForPutting
): Promise<ISettingsResult | undefined> {
    const response = await fetch(`${BASE_API}/users/${id}/settings`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
    });
    try {
        const settings = await response.json();
        return settings;
    } catch (error) {
        if (response.status === 401) {
            console.log('Access token is missing or invalid');
        } else if (response.status === 400) {
            console.log('Bad request');
        } else {
            console.log('Some error');
        }
    }
}
