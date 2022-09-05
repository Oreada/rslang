import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { getStatistics, putStatistics, getUserAggregatedWordsFiltered } from '../api/api';
import { IStatisticsResult, IDataForStatistics, IUserWordsAggregated } from '../../types/types';

//* TODO: нужен ли параметр "learnedWords" - ???

export async function processStatistics(
    game: 'audiochallenge' | 'sprint' | 'textbook',
    resultsObj: IDataForStatistics
) {
    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;

        const oldStatistics = (await getStatistics(userId, userToken)) as IStatisticsResult;

        if (oldStatistics) {
            // let  learnedWords = oldStatistics.learnedWords; //! это поле мне пока не нужно
            let lastDayStatisticsAudio = oldStatistics.optional.lastDayStatistics.audiochallenge as IDataForStatistics;
            let lastDayStatisticsSprint = oldStatistics.optional.lastDayStatistics.sprint as IDataForStatistics;
            const allDaysStatistics = oldStatistics.optional.allDaysStatistics as Record<
                string,
                Array<Array<string | number>>
            >;

            //! вынесла константу сюда, чтобы её можно было использовать при работе с долгосрочной статистикой
            // let bestScore = allDaysStatistics.days[allDaysStatistics.days.length - 1][3];
            let bestScore = lastDayStatisticsSprint.bestScore as number;

            if (game === 'audiochallenge') {
                //! game === 'audiochallenge' -----------------------------------------------------------------
                let latestDate = lastDayStatisticsAudio.latestDate;
                let firstTimeInGame = lastDayStatisticsAudio.firstTimeInGame;
                let totalAnswers = lastDayStatisticsAudio.totalAnswers;
                let correctAnswers = lastDayStatisticsAudio.correctAnswers;
                let incorrectAnswers = lastDayStatisticsAudio.incorrectAnswers;
                let bestSeriesOfAnswers = lastDayStatisticsAudio.bestSeriesOfAnswers;

                //! ТУТ МЕНЯЮ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ В СООТВЕТСТВИИ С НОВЫМИ ДАННЫМИ ИЗ ИГРЫ:
                if (latestDate === resultsObj.latestDate) {
                    firstTimeInGame += resultsObj.firstTimeInGame;
                    totalAnswers += resultsObj.totalAnswers;
                    correctAnswers += resultsObj.correctAnswers;
                    incorrectAnswers += resultsObj.incorrectAnswers;
                    bestSeriesOfAnswers =
                        bestSeriesOfAnswers >= resultsObj.bestSeriesOfAnswers
                            ? bestSeriesOfAnswers
                            : resultsObj.bestSeriesOfAnswers;
                } else {
                    latestDate = resultsObj.latestDate; //! в latestDate записывается новая дата - СЕГОДНЯ
                    firstTimeInGame = resultsObj.firstTimeInGame;
                    totalAnswers = resultsObj.totalAnswers;
                    correctAnswers = resultsObj.correctAnswers;
                    incorrectAnswers = resultsObj.incorrectAnswers;
                    bestSeriesOfAnswers = resultsObj.bestSeriesOfAnswers;
                }

                //! В ИТОГЕ ПОЛУЧАЕТСЯ НОВЫЙ lastDayStatisticsAudio:
                lastDayStatisticsAudio = {
                    latestDate: latestDate,
                    firstTimeInGame: firstTimeInGame,
                    totalAnswers: totalAnswers,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                    bestSeriesOfAnswers: bestSeriesOfAnswers,
                    bestScore: undefined,
                };
            } else if (game === 'sprint') {
                //! game === 'sprint' -----------------------------------------------------------------
                let latestDate = lastDayStatisticsSprint.latestDate;
                let firstTimeInGame = lastDayStatisticsSprint.firstTimeInGame;
                let totalAnswers = lastDayStatisticsSprint.totalAnswers;
                let correctAnswers = lastDayStatisticsSprint.correctAnswers;
                let incorrectAnswers = lastDayStatisticsSprint.incorrectAnswers;
                let bestSeriesOfAnswers = lastDayStatisticsSprint.bestSeriesOfAnswers;

                //! ТУТ МЕНЯЮ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ В СООТВЕТСТВИИ С НОВЫМИ ДАННЫМИ ИЗ ИГРЫ:
                if (latestDate === resultsObj.latestDate) {
                    firstTimeInGame += resultsObj.firstTimeInGame;
                    totalAnswers += resultsObj.totalAnswers;
                    correctAnswers += resultsObj.correctAnswers;
                    incorrectAnswers += resultsObj.incorrectAnswers;
                    bestSeriesOfAnswers =
                        bestSeriesOfAnswers >= resultsObj.bestSeriesOfAnswers
                            ? bestSeriesOfAnswers
                            : resultsObj.bestSeriesOfAnswers;
                    bestScore =
                        (lastDayStatisticsSprint.bestScore as number) >= (resultsObj.bestScore as number)
                            ? (lastDayStatisticsSprint.bestScore as number)
                            : (resultsObj.bestScore as number); //! это свойство есть только у Спринта
                } else {
                    latestDate = resultsObj.latestDate; //! в latestDate записывается новая дата - СЕГОДНЯ
                    firstTimeInGame = resultsObj.firstTimeInGame;
                    totalAnswers = resultsObj.totalAnswers;
                    correctAnswers = resultsObj.correctAnswers;
                    incorrectAnswers = resultsObj.incorrectAnswers;
                    bestSeriesOfAnswers = resultsObj.bestSeriesOfAnswers;
                    bestScore = resultsObj.bestScore as number; //! это свойство есть только у Спринта
                }

                //! В ИТОГЕ ПОЛУЧАЕТСЯ НОВЫЙ lastDayStatisticsSprint:
                lastDayStatisticsSprint = {
                    latestDate: latestDate,
                    firstTimeInGame: firstTimeInGame,
                    totalAnswers: totalAnswers,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                    bestSeriesOfAnswers: bestSeriesOfAnswers,
                    bestScore: bestScore,
                };
            } else {
                console.log('Неверное значение параметра "game"');
            }

            const lastDateInLongtermStatistics = allDaysStatistics.days[allDaysStatistics.days.length - 1];

            const easyWordsAll = (await getUserAggregatedWordsFiltered(
                userId,
                userToken,
                'easy',
                '0',
                '1'
            )) as IUserWordsAggregated[];
            const amountEasyWordsAll = easyWordsAll[0].totalCount[0].count;

            if (lastDateInLongtermStatistics[lastDateInLongtermStatistics.length - 1] === resultsObj.latestDate) {
                //! если такая дата уже ЕСТЬ в долгосрочной статистике, то редактируем значения из этой даты:
                // [всего играло слов, всего правильно, всего неправильно, лучший скор в спринте, всего новых слов, всего слов сложности "easy" (изученные), дата]
                lastDateInLongtermStatistics[0] = (lastDateInLongtermStatistics[0] as number) + resultsObj.totalAnswers;
                lastDateInLongtermStatistics[1] =
                    (lastDateInLongtermStatistics[1] as number) + resultsObj.correctAnswers;
                lastDateInLongtermStatistics[2] =
                    (lastDateInLongtermStatistics[2] as number) + resultsObj.incorrectAnswers;
                lastDateInLongtermStatistics[4] =
                    (lastDateInLongtermStatistics[4] as number) + resultsObj.firstTimeInGame;
                lastDateInLongtermStatistics[5] = amountEasyWordsAll;
                if (game === 'sprint') {
                    lastDateInLongtermStatistics[3] = bestScore as number;
                }
            } else {
                //! если такой даты ещё НЕТ в долгосрочной статистике, то создаём новую дату с новыми значениями:
                allDaysStatistics.days.push([
                    resultsObj.totalAnswers,
                    resultsObj.correctAnswers,
                    resultsObj.incorrectAnswers,
                    game === 'audiochallenge' ? 0 : (resultsObj.bestScore as number),
                    resultsObj.firstTimeInGame,
                    amountEasyWordsAll,
                    resultsObj.latestDate,
                ]);
            }

            (await putStatistics(userId, userToken, {
                learnedWords: 0,
                optional: {
                    lastDayStatistics: {
                        audiochallenge: lastDayStatisticsAudio,
                        sprint: lastDayStatisticsSprint,
                    },
                    allDaysStatistics: allDaysStatistics,
                },
            })) as IStatisticsResult;
        } else {
            //! если нет старой Статистики - создаём впервые на основе данных из "resultsObj" -------------------------

            const easyWordsAll = (await getUserAggregatedWordsFiltered(
                userId,
                userToken,
                'easy',
                '0',
                '1'
            )) as IUserWordsAggregated[];

            let amountEasyWordsAll;
            if (easyWordsAll[0].totalCount.length > 0) {
                amountEasyWordsAll = easyWordsAll[0].totalCount[0].count;
            } else {
                amountEasyWordsAll = 0;
            }

            if (game === 'audiochallenge') {
                (await putStatistics(userId, userToken, {
                    learnedWords: 0,
                    optional: {
                        lastDayStatistics: {
                            audiochallenge: {
                                latestDate: resultsObj.latestDate,
                                firstTimeInGame: resultsObj.firstTimeInGame,
                                totalAnswers: resultsObj.totalAnswers,
                                correctAnswers: resultsObj.correctAnswers,
                                incorrectAnswers: resultsObj.incorrectAnswers,
                                bestSeriesOfAnswers: resultsObj.bestSeriesOfAnswers,
                                bestScore: undefined,
                            },
                            sprint: {
                                latestDate: resultsObj.latestDate,
                                firstTimeInGame: 0,
                                totalAnswers: 0,
                                correctAnswers: 0,
                                incorrectAnswers: 0,
                                bestSeriesOfAnswers: 0,
                                bestScore: 0,
                            },
                        },
                        allDaysStatistics: {
                            days: [
                                [
                                    resultsObj.totalAnswers,
                                    resultsObj.correctAnswers,
                                    resultsObj.incorrectAnswers,
                                    0,
                                    resultsObj.firstTimeInGame,
                                    amountEasyWordsAll,
                                    resultsObj.latestDate,
                                ],
                            ],
                        },
                    },
                })) as IStatisticsResult;
            } else if (game === 'sprint') {
                (await putStatistics(userId, userToken, {
                    learnedWords: 0,
                    optional: {
                        lastDayStatistics: {
                            audiochallenge: {
                                latestDate: resultsObj.latestDate,
                                firstTimeInGame: 0,
                                totalAnswers: 0,
                                correctAnswers: 0,
                                incorrectAnswers: 0,
                                bestSeriesOfAnswers: 0,
                                bestScore: undefined,
                            },
                            sprint: {
                                latestDate: resultsObj.latestDate,
                                firstTimeInGame: resultsObj.firstTimeInGame,
                                totalAnswers: resultsObj.totalAnswers,
                                correctAnswers: resultsObj.correctAnswers,
                                incorrectAnswers: resultsObj.incorrectAnswers,
                                bestSeriesOfAnswers: resultsObj.bestSeriesOfAnswers,
                                bestScore: resultsObj.bestScore,
                            },
                        },

                        allDaysStatistics: {
                            days: [
                                [
                                    resultsObj.totalAnswers,
                                    resultsObj.correctAnswers,
                                    resultsObj.incorrectAnswers,
                                    resultsObj.bestScore as number,
                                    resultsObj.firstTimeInGame,
                                    amountEasyWordsAll,
                                    resultsObj.latestDate,
                                ],
                            ],
                        },
                    },
                })) as IStatisticsResult;
            } else if (game === 'textbook') {
                (await putStatistics(userId, userToken, {
                    learnedWords: 0,
                    optional: {
                        lastDayStatistics: {
                            audiochallenge: {
                                latestDate: resultsObj.latestDate,
                                firstTimeInGame: 0,
                                totalAnswers: 0,
                                correctAnswers: 0,
                                incorrectAnswers: 0,
                                bestSeriesOfAnswers: 0,
                                bestScore: undefined,
                            },
                            sprint: {
                                latestDate: resultsObj.latestDate,
                                firstTimeInGame: 0,
                                totalAnswers: 0,
                                correctAnswers: 0,
                                incorrectAnswers: 0,
                                bestSeriesOfAnswers: 0,
                                bestScore: 0,
                            },
                        },

                        allDaysStatistics: {
                            days: [
                                [
                                    resultsObj.totalAnswers,
                                    resultsObj.correctAnswers,
                                    resultsObj.incorrectAnswers,
                                    resultsObj.bestScore as number,
                                    resultsObj.firstTimeInGame,
                                    amountEasyWordsAll,
                                    resultsObj.latestDate,
                                ],
                            ],
                        },
                    },
                })) as IStatisticsResult;
            } else {
                console.log('Неверное значение параметра "game"');
            }
        }
    } else {
        console.log('Пользователь не авторизован, статистика не сохранится');
    }
}

// const oldStatisticsTest = (await getStatistics(
//     '62fe0020d755e24640edaabd',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MjMyNjc4MCwiZXhwIjoxNjYyMzQxMTgwfQ.bKqq5e7fKGvpUqHy0RqkOpez8kR9XlU6rxrvsN6fXyA'
// )) as IStatisticsResult;
// console.log(oldStatisticsTest);
