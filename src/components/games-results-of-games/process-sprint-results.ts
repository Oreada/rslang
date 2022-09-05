import { getUserWord, createUserWord, updateUserWord } from '../api/api';

export async function processSprintResults(idUser: string, tokenUser: string, resultsPairs: Array<Array<string>>) {
    let gameNewCnt = 0;

    for await (const pair of resultsPairs) {
        const word = await getUserWord(idUser, pair[0], tokenUser);

        if (word === undefined) {
            gameNewCnt += 1;
            console.log('Создание нового слова пользователя (Sprint)');
            await createUserWord(
                idUser,
                pair[0],
                {
                    difficulty: 'new',
                    optional: {
                        totalCorrectAudiochallenge: 0,
                        totalIncorrectAudiochallenge: 0,
                        totalCorrectSprint: pair[1] === 'correct' ? 1 : 0,
                        totalIncorrectSprint: pair[1] === 'incorrect' ? 1 : 0,
                        consecutiveCorrectAudiochallenge: 0, //! - не используем - ?
                        consecutiveIncorrectAudiochallenge: 0, //! - не используем - ?
                        consecutiveCorrectSprint: pair[1] === 'correct' ? 1 : 0, //! - не используем - ?
                        consecutiveIncorrectSprint: pair[1] === 'incorrect' ? 1 : 0, //! - не используем - ?
                        consecutiveCorrectAll: pair[1] === 'correct' ? 1 : 0,
                        consecutiveIncorrectAll: pair[1] === 'incorrect' ? 1 : 0,
                    },
                },
                tokenUser
            );
        } else {
            console.log('Изменение слова пользователя (Sprint)');

            const oldTotalCorrect = word.optional.totalCorrectSprint;
            const oldTotalIncorrect = word.optional.totalIncorrectSprint;
            const oldConsecutiveCorrectSprint = word.optional.consecutiveCorrectSprint; //! - не используем - ?
            const oldConsecutiveIncorrectSprint = word.optional.consecutiveIncorrectSprint; //! - не используем - ?
            const oldConsecutiveCorrect = word.optional.consecutiveCorrectAll;
            const oldConsecutiveIncorrect = word.optional.consecutiveIncorrectAll;

            console.log(pair[0], oldTotalCorrect, oldTotalIncorrect, oldConsecutiveCorrect, oldConsecutiveIncorrect);

            let newDifficulty = word.difficulty;
            let newTotalCorrect = oldTotalCorrect;
            let newTotalIncorrect = oldTotalIncorrect;
            let newConsecutiveCorrectSprint = oldConsecutiveCorrectSprint; //! - не используем - ?
            let newConsecutiveIncorrectSprint = oldConsecutiveIncorrectSprint; //! - не используем - ?
            let newConsecutiveCorrect = oldConsecutiveCorrect;
            let newConsecutiveIncorrect = oldConsecutiveIncorrect;

            if (pair[1] === 'correct') {
                newTotalCorrect = oldTotalCorrect + 1;
                newConsecutiveCorrectSprint = oldConsecutiveCorrectSprint + 1; //! - не используем - ?
                newConsecutiveCorrect = oldConsecutiveCorrect + 1;
                newConsecutiveIncorrectSprint = 0; //! - не используем - ?
                newConsecutiveIncorrect = 0; //! обнуляем серию неправильных ответов подряд после верного ответа
            } else if (pair[1] === 'incorrect') {
                newTotalIncorrect = oldTotalIncorrect + 1;
                newConsecutiveIncorrectSprint = oldConsecutiveIncorrectSprint + 1; //! - не используем - ?
                newConsecutiveIncorrect = oldConsecutiveIncorrect + 1;
                newConsecutiveCorrectSprint = 0; //! - не используем - ?
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
                        totalCorrectAudiochallenge: word.optional.totalCorrectAudiochallenge,
                        totalIncorrectAudiochallenge: word.optional.totalIncorrectAudiochallenge,
                        totalCorrectSprint: newTotalCorrect as number,
                        totalIncorrectSprint: newTotalIncorrect as number,
                        consecutiveCorrectAudiochallenge: word.optional.consecutiveCorrectAudiochallenge, //! - не используем - ?
                        consecutiveIncorrectAudiochallenge: word.optional.consecutiveIncorrectAudiochallenge, //! - не используем - ?
                        consecutiveCorrectSprint: newConsecutiveCorrectSprint as number, //! - не используем - ?
                        consecutiveIncorrectSprint: newConsecutiveIncorrectSprint as number, //! - не используем - ?
                        consecutiveCorrectAll: newConsecutiveCorrect as number,
                        consecutiveIncorrectAll: newConsecutiveIncorrect as number,
                    },
                },
                tokenUser
            );

            const isNew =
                newTotalCorrect +
                    newTotalIncorrect +
                    word.optional.totalCorrectAudiochallenge +
                    word.optional.totalIncorrectAudiochallenge ===
                1;
            gameNewCnt += isNew ? 1 : 0;
        }
    }
    return { gameNewCnt: gameNewCnt };
}
