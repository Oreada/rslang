import {
    getWords,
    getWordById,
    createUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    getNewToken,
    getAllUserWords,
    createUserWord,
    getUserWord,
    updateUserWord,
    deleteUserWord,
    getUserAggregatedWordsFiltered,
    getUserAggregatedWord,
    putStatistics,
    getStatistics,
    putSettings,
    getSettings,
} from './api';

const objTestForCreate = {
    name: 'Barry Allen',
    email: 'allen@gmail.com',
    password: '987654321',
};

const objTestForLogin = {
    email: 'allen@gmail.com',
    password: '987654321',
};

const objTestForUpdate = {
    name: '',
    email: '',
    password: '',
};

console.log(await getWords('0', '1')); //! пример получения слов из базы данных (опред. группа и страница)

console.log(await getWordById('5e9f5ee35eb9e72bc21af4bb')); //! пример получения конкретного слова

// const creationResult = await createUser(objTestForCreate); //! пример создания юзера
// console.log(creationResult);
// const userId = creationResult?.id as string;
const userId = '62fe0020d755e24640edaabd';

const authResultObj = await loginUser(objTestForLogin); //! пример авторизации юзера
console.log(authResultObj);
const token = authResultObj?.token as string;
const refreshToken = authResultObj?.refreshToken as string;

// console.log(await getUser(userId, token)); //! пример получения юзера

// console.log(await updateUser(userId, token, objTestForUpdate)); //! пример редактирования юзера

// console.log(await deleteUser(userId, token)); //! пример удаления юзера

console.log(await getNewToken(userId, refreshToken)); //! пример получения нового токена

console.log(
    await createUserWord(
        userId,
        '5e9f5ee35eb9e72bc21af4b4',
        { difficulty: 'easy', optional: { test: 'someValue' } },
        token
    )
); //! пример создания слова пользователя, т.е. обозначения его сложности

console.log(await getAllUserWords(userId, token)); //! пример получения всех слов пользователя

console.log(await getUserWord(userId, ' ', token)); //! пример получения конкретного слова пользователя

console.log(
    await updateUserWord(
        userId,
        '5e9f5ee35eb9e72bc21af4b4',
        { difficulty: 'hard', optional: { test: 'anotherValue' } },
        token
    )
); //! пример редактирования слова пользователя, т.е. изменения его СЛОЖНОСТИ и ОПЦИЙ

console.log(await getAllUserWords(userId, token)); //! видим, что слово в списке изменилось

console.log(await deleteUserWord(userId, '5e9f5ee35eb9e72bc21af4b2', token)); //! пример удаления конкретного слова пользователя
//! если у пользователя нет этого слова в списке, то всё равно приходит статус об успешном удалении - так прописано в бэкэнде

console.log(await getAllUserWords(userId, token)); //! видим, что слово удалилось из списка

console.log(await getUserAggregatedWordsFiltered(userId, token, 'hard')); //! пример получения списка отфильтрованных aggregatedWords
console.log(await getUserAggregatedWordsFiltered(userId, token, 'easy')); //! пример получения списка отфильтрованных aggregatedWord

console.log(await getUserAggregatedWord(userId, '5e9f5ee35eb9e72bc21af4b4', token)); //! пример получения aggregatedWord

console.log(
    await putStatistics(userId, token, {
        learnedWords: 5,
        optional: { test: 'something' },
    })
); //! пример редактирования статистики пользователя

console.log(await getStatistics(userId, token)); //! пример получения статистики пользователя

console.log(
    await putSettings(userId, token, {
        wordsPerDay: 1,
        optional: { testProperty: 'testValue' },
    })
); //! пример редактирования записей-settings пользователя

console.log(await getSettings(userId, token)); //! пример получения записей-settings пользователя
