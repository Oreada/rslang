import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { getStatistics, putStatistics } from '../api/api';
import { IStatisticsResult, IDataForStatistics } from '../../types/types';

//* TODO: переделать "allDaysStatistics" из объекта в массив - ???
//* TODO: нужен ли параметр "learnedWords" - ???
//* TODO: обнулять данные дня, если он не является СЕГОДНЯШНИМ (lastDayStatistics)

export async function processStatistics(game: 'audiochallenge' | 'sprint', resultsObj: IDataForStatistics) {
    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;

        const oldStatistics = (await getStatistics(userId, userToken)) as IStatisticsResult;

        if (oldStatistics) {
            // let  learnedWords = oldStatistics.learnedWords; //! это поле мне пока не нужно
            let lastDayStatisticsAudio = oldStatistics.optional.lastDayStatistics.audiochallenge as IDataForStatistics;
            let lastDayStatisticsSprint = oldStatistics.optional.lastDayStatistics.sprint as IDataForStatistics;
            const allDaysStatistics = oldStatistics.optional.allDaysStatistics as Record<string, Array<number>>;
            if (game === 'audiochallenge') {
                //! game === 'audiochallenge' -----------------------------------------------------------------
                const latestDate = lastDayStatisticsAudio.latestDate;
                const totalAnswers = lastDayStatisticsAudio.totalAnswers;
                const correctAnswers = lastDayStatisticsAudio.correctAnswers;
                const incorrectAnswers = lastDayStatisticsAudio.incorrectAnswers;
                const firstTimeInGame = lastDayStatisticsAudio.firstTimeInGame;
                const bestSeriesOfAnswers = lastDayStatisticsAudio.bestSeriesOfAnswers;

                //! ТУТ МЕНЯЮ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ В СООТВЕТСТВИИ С НОВЫМИ ДАННЫМИ ИЗ ИГРЫ

                //! В ИТОГЕ БУДЕТ НОВЫЙ lastDayStatisticsAudio:
                lastDayStatisticsAudio = {
                    latestDate: latestDate,
                    totalAnswers: totalAnswers,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                    firstTimeInGame: firstTimeInGame,
                    bestSeriesOfAnswers: bestSeriesOfAnswers,
                    bestScore: undefined,
                };
            } else if (game === 'sprint') {
                //! game === 'sprint' -----------------------------------------------------------------
                const latestDate = lastDayStatisticsSprint.latestDate;
                const totalAnswers = lastDayStatisticsSprint.totalAnswers;
                const correctAnswers = lastDayStatisticsSprint.correctAnswers;
                const incorrectAnswers = lastDayStatisticsSprint.incorrectAnswers;
                const firstTimeInGame = lastDayStatisticsSprint.firstTimeInGame;
                const bestSeriesOfAnswers = lastDayStatisticsSprint.bestSeriesOfAnswers;
                const bestScore = lastDayStatisticsSprint.bestScore; //! это свойство есть только у Спринта

                //! ТУТ МЕНЯЮ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ В СООТВЕТСТВИИ С НОВЫМИ ДАННЫМИ ИЗ ИГРЫ

                //! В ИТОГЕ БУДЕТ НОВЫЙ lastDayStatisticsSprint:
                lastDayStatisticsSprint = {
                    latestDate: latestDate,
                    totalAnswers: totalAnswers,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                    firstTimeInGame: firstTimeInGame,
                    bestSeriesOfAnswers: bestSeriesOfAnswers,
                    bestScore: bestScore,
                };
            } else {
                console.log('Неверное значение параметра "game"');
            }

            if (Object.keys(allDaysStatistics).includes(resultsObj.latestDate)) {
                //! если такая дата уже ЕСТЬ в долгосрочной статистике, то добавляем в неё новые значения:
                // дата:[всегоОтветов, правильные, неправильные, bestScoreSprint]
                allDaysStatistics[resultsObj.latestDate] = [
                    allDaysStatistics[resultsObj.latestDate][0] + resultsObj.totalAnswers,
                    allDaysStatistics[resultsObj.latestDate][1] + resultsObj.correctAnswers,
                    allDaysStatistics[resultsObj.latestDate][2] + resultsObj.incorrectAnswers,
                    allDaysStatistics[resultsObj.latestDate][3] + game === 'audiochallenge'
                        ? 0
                        : (resultsObj.bestScore as number),
                ];
            } else {
                //! если такой даты ещё НЕТ в долгосрочной статистике, то создаём в ней новые значения:
                allDaysStatistics[resultsObj.latestDate] = [
                    resultsObj.totalAnswers,
                    resultsObj.correctAnswers,
                    resultsObj.incorrectAnswers,
                    game === 'audiochallenge' ? 0 : (resultsObj.bestScore as number),
                ];
            }

            (await putStatistics(userId, userToken, {
                learnedWords: 0,
                optional: {
                    lastDayStatistics: {
                        audiochallenge: lastDayStatisticsAudio,
                        sprint: lastDayStatisticsSprint,
                    },
                    allDaysStatistics: allDaysStatistics,
                    // "31.08.2022": [33, 12, 11, 550]
                    // ['31.08.2022:33:12:11:550', '01.09.2022:50:36:14:400']
                },
            })) as IStatisticsResult;
        } else {
            //! если нет старой Статистики - создаём впервые на основе данных из "resultsObj" -------------------------
            if (game === 'audiochallenge') {
                (await putStatistics(userId, userToken, {
                    learnedWords: 0,
                    optional: {
                        lastDayStatistics: {
                            audiochallenge: {
                                latestDate: resultsObj.latestDate,
                                totalAnswers: resultsObj.totalAnswers,
                                correctAnswers: resultsObj.correctAnswers,
                                incorrectAnswers: resultsObj.incorrectAnswers,
                                firstTimeInGame: resultsObj.firstTimeInGame,
                                bestSeriesOfAnswers: resultsObj.bestSeriesOfAnswers,
                                bestScore: 0,
                            },
                            sprint: {
                                latestDate: resultsObj.latestDate,
                                totalAnswers: 0,
                                correctAnswers: 0,
                                incorrectAnswers: 0,
                                firstTimeInGame: 0,
                                bestSeriesOfAnswers: 0,
                                bestScore: 0,
                            },
                        },
                        allDaysStatistics: {
                            [resultsObj.latestDate]: [
                                resultsObj.totalAnswers,
                                resultsObj.correctAnswers,
                                resultsObj.incorrectAnswers,
                                0, //! т.к. у Аудиовызова нет "bestScore"
                            ],
                        },
                        // "31.08.2022": [33, 12, 11, 550]
                        // ['31.08.2022:33:12:11:550', '01.09.2022:50:36:14:400']
                    },
                })) as IStatisticsResult;
            } else if (game === 'sprint') {
                (await putStatistics(userId, userToken, {
                    learnedWords: 0,
                    optional: {
                        lastDayStatistics: {
                            audiochallenge: {
                                latestDate: resultsObj.latestDate,
                                totalAnswers: 0,
                                correctAnswers: 0,
                                incorrectAnswers: 0,
                                firstTimeInGame: 0,
                                bestSeriesOfAnswers: 0,
                                bestScore: 0,
                            },
                            sprint: {
                                latestDate: resultsObj.latestDate,
                                totalAnswers: resultsObj.totalAnswers,
                                correctAnswers: resultsObj.correctAnswers,
                                incorrectAnswers: resultsObj.incorrectAnswers,
                                firstTimeInGame: resultsObj.firstTimeInGame,
                                bestSeriesOfAnswers: resultsObj.bestSeriesOfAnswers,
                                bestScore: resultsObj.bestScore,
                            },
                        },
                        allDaysStatistics: {
                            [resultsObj.latestDate]: [
                                resultsObj.totalAnswers,
                                resultsObj.correctAnswers,
                                resultsObj.incorrectAnswers,
                                resultsObj.bestScore as number, //! т.к. у Спринта есть "bestScore"
                            ],
                        },
                        // "31.08.2022": [33, 12, 11, 550]
                        // ['31.08.2022:33:12:11:550', '01.09.2022:50:36:14:400']
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
