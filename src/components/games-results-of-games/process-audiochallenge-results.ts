import { getUserWord, createUserWord, updateUserWord } from '../api/api';

export async function processAudiochallengeResults(
    idUser: string,
    tokenUser: string,
    resultsPairs: Array<Array<string>>
) {
    let gameNewCnt = 0;

    for await (const pair of resultsPairs) {
        const word = await getUserWord(idUser, pair[0], tokenUser);

        if (word === undefined) {
            gameNewCnt += 1;
            console.log('Создание нового слова пользователя (Audiochallenge)');
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
                        consecutiveCorrectAudiochallenge: pair[1] === 'correct' ? 1 : 0, //! - не используем - ?
                        consecutiveIncorrectAudiochallenge: pair[1] === 'incorrect' ? 1 : 0, //! - не используем - ?
                        consecutiveCorrectSprint: 0, //! - не используем - ?
                        consecutiveIncorrectSprint: 0, //! - не используем - ?
                        consecutiveCorrectAll: pair[1] === 'correct' ? 1 : 0,
                        consecutiveIncorrectAll: pair[1] === 'incorrect' ? 1 : 0,
                    },
                },
                tokenUser
            );
        } else {
            console.log('Изменение слова пользователя (Audiochallenge)');

            const oldTotalCorrect = word.optional.totalCorrectAudiochallenge;
            const oldTotalIncorrect = word.optional.totalIncorrectAudiochallenge;
            const oldConsecutiveCorrectAudiochallenge = word.optional.consecutiveCorrectAudiochallenge; //! - не используем - ?
            const oldConsecutiveIncorrectAudiochallenge = word.optional.consecutiveIncorrectAudiochallenge; //! - не используем - ?
            const oldConsecutiveCorrect = word.optional.consecutiveCorrectAll;
            const oldConsecutiveIncorrect = word.optional.consecutiveIncorrectAll;

            let newDifficulty = word.difficulty;
            let newTotalCorrect = oldTotalCorrect;
            let newTotalIncorrect = oldTotalIncorrect;
            let newConsecutiveCorrectAudiochallenge = oldConsecutiveCorrectAudiochallenge; //! - не используем - ?
            let newConsecutiveIncorrectAudiochallenge = oldConsecutiveIncorrectAudiochallenge; //! - не используем - ?
            let newConsecutiveCorrect = oldConsecutiveCorrect;
            let newConsecutiveIncorrect = oldConsecutiveIncorrect;

            if (pair[1] === 'correct') {
                newTotalCorrect = oldTotalCorrect + 1;
                newConsecutiveCorrectAudiochallenge = oldConsecutiveCorrectAudiochallenge + 1; //! - не используем - ?
                newConsecutiveCorrect = oldConsecutiveCorrect + 1;
                newConsecutiveIncorrectAudiochallenge = 0; //! - не используем - ?
                newConsecutiveIncorrect = 0; //! обнуляем серию неправильных ответов подряд после верного ответа
            } else if (pair[1] === 'incorrect') {
                newTotalIncorrect = oldTotalIncorrect + 1;
                newConsecutiveIncorrectAudiochallenge = oldConsecutiveIncorrectAudiochallenge + 1; //! - не используем - ?
                newConsecutiveIncorrect = oldConsecutiveIncorrect + 1;
                newConsecutiveCorrectAudiochallenge = 0; //! - не используем - ?
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
                        consecutiveCorrectAudiochallenge: newConsecutiveCorrectAudiochallenge as number, //! - не используем - ?
                        consecutiveIncorrectAudiochallenge: newConsecutiveIncorrectAudiochallenge as number, //! - не используем - ?
                        consecutiveCorrectSprint: word.optional.consecutiveCorrectSprint, //! - не используем - ?
                        consecutiveIncorrectSprint: word.optional.consecutiveIncorrectSprint, //! - не используем - ?
                        consecutiveCorrectAll: newConsecutiveCorrect as number,
                        consecutiveIncorrectAll: newConsecutiveIncorrect as number,
                    },
                },
                tokenUser
            );

            const isNew =
                newTotalCorrect +
                newTotalIncorrect +
                word.optional.totalCorrectSprint +
                word.optional.totalIncorrectSprint ===
                1;
            gameNewCnt += isNew ? 1 : 0;
        }
    }
    return { gameNewCnt: gameNewCnt };
}
