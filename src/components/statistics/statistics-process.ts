import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { getStatistics, putStatistics } from '../api/api';
import { IStatisticsResult, IDataForStatistics } from '../../types/types';

//* TODO: переделать "allDaysStatistics" из объекта в массив - ???
//* TODO: нужен ли параметр "learnedWords" - ???

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

            //! вынесла константу сюда, чтобы её можно было использовать при работе с долгосрочной статистикой
            let bestScore = lastDayStatisticsSprint.bestScore as number;

            if (game === 'audiochallenge') {
                //! game === 'audiochallenge' -----------------------------------------------------------------
                let latestDate = lastDayStatisticsAudio.latestDate;
                let totalAnswers = lastDayStatisticsAudio.totalAnswers;
                let correctAnswers = lastDayStatisticsAudio.correctAnswers;
                let incorrectAnswers = lastDayStatisticsAudio.incorrectAnswers;
                let bestSeriesOfAnswers = lastDayStatisticsAudio.bestSeriesOfAnswers;

                //! ТУТ МЕНЯЮ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ В СООТВЕТСТВИИ С НОВЫМИ ДАННЫМИ ИЗ ИГРЫ: - дублирование кода - ???
                if (latestDate === resultsObj.latestDate) {
                    totalAnswers += resultsObj.totalAnswers;
                    correctAnswers += resultsObj.correctAnswers;
                    incorrectAnswers += resultsObj.incorrectAnswers;
                    bestSeriesOfAnswers =
                        bestSeriesOfAnswers >= resultsObj.bestSeriesOfAnswers
                            ? bestSeriesOfAnswers
                            : resultsObj.bestSeriesOfAnswers;
                } else {
                    latestDate = resultsObj.latestDate; //! в latestDate записывается новая дата - СЕГОДНЯ
                    totalAnswers = resultsObj.totalAnswers;
                    correctAnswers = resultsObj.correctAnswers;
                    incorrectAnswers = resultsObj.incorrectAnswers;
                    bestSeriesOfAnswers = resultsObj.bestSeriesOfAnswers;
                }

                //! В ИТОГЕ ПОЛУЧАЕТСЯ НОВЫЙ lastDayStatisticsAudio:
                lastDayStatisticsAudio = {
                    latestDate: latestDate,
                    totalAnswers: totalAnswers,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                    bestSeriesOfAnswers: bestSeriesOfAnswers,
                    bestScore: undefined,
                };
            } else if (game === 'sprint') {
                //! game === 'sprint' -----------------------------------------------------------------
                let latestDate = lastDayStatisticsSprint.latestDate;
                let totalAnswers = lastDayStatisticsSprint.totalAnswers;
                let correctAnswers = lastDayStatisticsSprint.correctAnswers;
                let incorrectAnswers = lastDayStatisticsSprint.incorrectAnswers;
                let bestSeriesOfAnswers = lastDayStatisticsSprint.bestSeriesOfAnswers;

                //! ТУТ МЕНЯЮ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ В СООТВЕТСТВИИ С НОВЫМИ ДАННЫМИ ИЗ ИГРЫ: - дублирование кода - ???
                if (latestDate === resultsObj.latestDate) {
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
                    totalAnswers = resultsObj.totalAnswers;
                    correctAnswers = resultsObj.correctAnswers;
                    incorrectAnswers = resultsObj.incorrectAnswers;
                    bestSeriesOfAnswers = resultsObj.bestSeriesOfAnswers;
                    bestScore = resultsObj.bestScore as number; //! это свойство есть только у Спринта
                }

                //! В ИТОГЕ ПОЛУЧАЕТСЯ НОВЫЙ lastDayStatisticsSprint:
                lastDayStatisticsSprint = {
                    latestDate: latestDate,
                    totalAnswers: totalAnswers,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                    bestSeriesOfAnswers: bestSeriesOfAnswers,
                    bestScore: bestScore,
                };
            } else {
                console.log('Неверное значение параметра "game"');
            }

            if (Object.keys(allDaysStatistics).includes(resultsObj.latestDate)) {
                //! если такая дата уже ЕСТЬ в долгосрочной статистике, то редактируем значения из этой даты:
                // дата:[всегоОтветов, правильные, неправильные, bestScoreSprint]
                allDaysStatistics[resultsObj.latestDate] = [
                    allDaysStatistics[resultsObj.latestDate][0] + resultsObj.totalAnswers,
                    allDaysStatistics[resultsObj.latestDate][1] + resultsObj.correctAnswers,
                    allDaysStatistics[resultsObj.latestDate][2] + resultsObj.incorrectAnswers,
                    bestScore as number,
                ];
            } else {
                //! если такой даты ещё НЕТ в долгосрочной статистике, то создаём новую дату с новыми значениями:
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
                                bestSeriesOfAnswers: resultsObj.bestSeriesOfAnswers,
                                bestScore: undefined,
                            },
                            sprint: {
                                latestDate: resultsObj.latestDate,
                                totalAnswers: 0,
                                correctAnswers: 0,
                                incorrectAnswers: 0,
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
                                bestSeriesOfAnswers: 0,
                                bestScore: undefined,
                            },
                            sprint: {
                                latestDate: resultsObj.latestDate,
                                totalAnswers: resultsObj.totalAnswers,
                                correctAnswers: resultsObj.correctAnswers,
                                incorrectAnswers: resultsObj.incorrectAnswers,
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

// const oldStatisticsTest = (await getStatistics(
//     '63138dd879d28845e47eff22',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTM4ZGQ4NzlkMjg4NDVlNDdlZmYyMiIsImlhdCI6MTY2MjIyNTg4MSwiZXhwIjoxNjYyMjQwMjgxfQ.8I0pKmyNX_eO-yROPEwt_jtMtAjQ6pHh8H1Q_UHlXw4'
// )) as IStatisticsResult;
// console.log(oldStatisticsTest);
