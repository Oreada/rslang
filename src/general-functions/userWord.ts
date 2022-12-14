import { createUserWord, getUserAggregatedWordsFiltered, getUserWord, updateUserWord } from '../components/api/api';
import { processStatistics } from '../components/statistics/statistics-process';
import { IAuthorizationResult } from '../types/types';
import { getTodayDate } from './getTodayDate';

export async function addUserWord(wordId: string, difficulty: 'easy' | 'hard') {
    const user: IAuthorizationResult = JSON.parse(localStorage.getItem('rslang_currentUser#') as string);
    const userId = user.userId;
    const userToken = user.token;

    const word = await getUserWord(userId, wordId, userToken);

    const learned = await getUserAggregatedWordsFiltered(userId, userToken, 'easy');
    console.log(learned);

    // const l = (await getUserAggregatedWordsFiltered(userId, userToken, 'easy', '0', '0', "20") as Array<IUserWordsAggregated>)
    // const w = (await getUserAggregatedWordsFiltered(userId, userToken, 'hard', '0', '0', "10000") as Array<IUserWordsAggregated>)

    // console.log(l, w)

    if (word) {
        await updateUserWord(
            userId,
            wordId,
            {
                difficulty: difficulty,
                optional: word.optional, //! дописала в соответствии с новой типизацией
            },
            userToken
        );
        console.log('слово обновлено');
        await processStatistics('textbook', {
            latestDate: getTodayDate(),
            firstTimeInGame: 0,
            totalAnswers: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            bestSeriesOfAnswers: 0,
            bestScore: 0,
        });
        return;
    }

    await createUserWord(
        userId,
        wordId,
        {
            difficulty: difficulty,
            optional: {
                //! дописала в соответствии с новой типизацией
                totalCorrectAudiochallenge: 0,
                totalIncorrectAudiochallenge: 0,
                totalCorrectSprint: 0,
                totalIncorrectSprint: 0,
                consecutiveCorrectAudiochallenge: 0,
                consecutiveIncorrectAudiochallenge: 0,
                consecutiveCorrectSprint: 0,
                consecutiveIncorrectSprint: 0,
                consecutiveCorrectAll: 0,
                consecutiveIncorrectAll: 0,
            },
        },
        userToken
    );
    console.log('слово добавлено');

    await processStatistics('textbook', {
        latestDate: getTodayDate(),
        firstTimeInGame: 0,
        totalAnswers: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        bestSeriesOfAnswers: 0,
        bestScore: 0,
    });
}
