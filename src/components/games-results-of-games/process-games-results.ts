import { getUserWord, createUserWord, updateUserWord } from '../api/api';

export async function processAudiochallengeResults(
    idUser: string,
    tokenUser: string,
    resultsPairs: Array<Array<string>>
) {
    for await (const pair of resultsPairs) {
        const word = await getUserWord(idUser, pair[0], tokenUser);

        if (word === undefined) {
            console.log('Создание нового слова пользователя');
            await createUserWord(
                idUser,
                pair[0],
                {
                    difficulty: 'new',
                    optional: {
                        totalCorrectAudiochallenge: pair[1] === 'correct' ? 1 : 0,
                        totalIncorrectAudiochallenge: pair[1] === 'incorrect' ? 1 : 0,
                        totalCorrectSprint: 0,
                        totalIncorrectSprint: 0,
                        consecutiveCorrectAudiochallenge: pair[1] === 'correct' ? 1 : 0,
                        consecutiveIncorrectAudiochallenge: pair[1] === 'incorrect' ? 1 : 0,
                        consecutiveCorrectSprint: 0,
                        consecutiveIncorrectSprint: 0,
                    },
                },
                tokenUser
            );
        } else {
            console.log('Изменение слова пользователя');

            const oldTotalCorrect = word.optional.totalCorrectAudiochallenge;
            const oldTotalIncorrect = word.optional.totalIncorrectAudiochallenge;
            const oldConsecutiveCorrect = word.optional.consecutiveCorrectAudiochallenge;
            const oldConsecutiveIncorrect = word.optional.consecutiveIncorrectAudiochallenge;

            console.log(pair[0], oldTotalCorrect, oldTotalIncorrect, oldConsecutiveCorrect, oldConsecutiveIncorrect);

            let newDifficulty = word.difficulty;
            let newTotalCorrect = oldTotalCorrect;
            let newTotalIncorrect = oldTotalIncorrect;
            let newConsecutiveCorrect = oldConsecutiveCorrect;
            let newConsecutiveIncorrect = oldConsecutiveIncorrect;

            if (pair[1] === 'correct') {
                newTotalCorrect = oldTotalCorrect + 1;
                newConsecutiveCorrect = oldConsecutiveCorrect + 1;
                newConsecutiveIncorrect = 0; //! обнуляем серию неправильных ответов подряд после верного ответа
            } else if (pair[1] === 'incorrect') {
                newTotalIncorrect = oldTotalIncorrect + 1;
                newConsecutiveIncorrect = oldConsecutiveIncorrect + 1;
                newConsecutiveCorrect = 0; //! обнуляем серию правильных ответов подряд после неверного ответа

                if (word.difficulty === 'easy') {
                    newDifficulty = 'new';
                }
            } else {
                console.log('Неверное значение результата игры! Должно быть correct | incorrect');
            }

            if (word.difficulty === 'new' && (newConsecutiveCorrect as number) >= 3) {
                newDifficulty = 'easy'; //! обычное слово стало изученным после трёх верных ответов подряд
                //* TODO: решить, нужно ли обнулять в этом случае серию ответов подряд - ?
            }

            if (word.difficulty === 'hard' && (newConsecutiveCorrect as number) >= 5) {
                newDifficulty = 'easy'; //! сложное слово стало изученным после пяти верных ответов подряд
                //* TODO: решить, нужно ли обнулять в этом случае серию ответов подряд - ?
            }

            //* TODO: решить, нужно ли менять word.difficulty на 'hard' при определённом количестве ошибок подряд - ?

            await updateUserWord(
                idUser,
                pair[0],
                {
                    difficulty: newDifficulty,
                    optional: {
                        totalCorrectAudiochallenge: newTotalCorrect as number,
                        totalIncorrectAudiochallenge: newTotalIncorrect as number,
                        totalCorrectSprint: word.optional.totalCorrectSprint,
                        totalIncorrectSprint: word.optional.totalIncorrectSprint,
                        consecutiveCorrectAudiochallenge: newConsecutiveCorrect as number,
                        consecutiveIncorrectAudiochallenge: newConsecutiveIncorrect as number,
                        consecutiveCorrectSprint: word.optional.consecutiveCorrectSprint,
                        consecutiveIncorrectSprint: word.optional.consecutiveIncorrectSprint,
                    },
                },
                tokenUser
            );
        }
    }
}
