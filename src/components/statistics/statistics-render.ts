import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { getStatistics } from '../api/api';
import { IStatisticsResult } from '../../types/types';
import { getTodayDate } from '../../general-functions/getTodayDate';
import { drawGraphic } from './graphics';

const todayDate = getTodayDate();
console.log(todayDate);

export async function contentStatisticsPage() {
    return `
    <div class="statistics">
        <div class="statistics__page">
            ${await renderDayStatistics()}
            ${await renderLongtermStatistics()}
        </div>
    </div>
    `;
}

async function renderDayStatistics() {
    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;

        const allUserStatistics = (await getStatistics(userId, userToken)) as IStatisticsResult;

        if (allUserStatistics) {
            let firstTimeInGameAudio;
            let firstTimeInGameSprint;
            let totalAnswersAudio;
            let correctAnswersAudio;
            let percentageCorrectAudio;
            let bestSeriesOfAnswersAudio;
            let totalAnswersSprint;
            let correctAnswersSprint;
            let percentageCorrectSprint;
            let bestSeriesOfAnswersSprint;
            let bestScore;

            if (allUserStatistics.optional.lastDayStatistics.audiochallenge.latestDate === todayDate) {
                firstTimeInGameAudio = allUserStatistics.optional.lastDayStatistics.audiochallenge.firstTimeInGame;
                totalAnswersAudio = allUserStatistics.optional.lastDayStatistics.audiochallenge.totalAnswers;
                correctAnswersAudio = allUserStatistics.optional.lastDayStatistics.audiochallenge.correctAnswers;
                percentageCorrectAudio = +((correctAnswersAudio / totalAnswersAudio) * 100).toFixed(2) || 0;
                bestSeriesOfAnswersAudio =
                    allUserStatistics.optional.lastDayStatistics.audiochallenge.bestSeriesOfAnswers;
            } else {
                firstTimeInGameAudio = 0;
                totalAnswersAudio = 0;
                correctAnswersAudio = 0;
                percentageCorrectAudio = 0;
                bestSeriesOfAnswersAudio = 0;
            }

            if (allUserStatistics.optional.lastDayStatistics.sprint.latestDate === todayDate) {
                firstTimeInGameSprint = allUserStatistics.optional.lastDayStatistics.sprint.firstTimeInGame;
                totalAnswersSprint = allUserStatistics.optional.lastDayStatistics.sprint.totalAnswers;
                correctAnswersSprint = allUserStatistics.optional.lastDayStatistics.sprint.correctAnswers;
                percentageCorrectSprint = +((correctAnswersSprint / totalAnswersSprint) * 100).toFixed(2) || 0;
                bestSeriesOfAnswersSprint = allUserStatistics.optional.lastDayStatistics.sprint.bestSeriesOfAnswers;
                bestScore = allUserStatistics.optional.lastDayStatistics.sprint.bestScore as number;
            } else {
                firstTimeInGameSprint = 0;
                totalAnswersSprint = 0;
                correctAnswersSprint = 0;
                percentageCorrectSprint = 0;
                bestSeriesOfAnswersSprint = 0;
                bestScore = 0;
            }

            const firstTimeInGameAll = firstTimeInGameAudio + firstTimeInGameSprint;
            const totalAnswersAll = totalAnswersAudio + totalAnswersSprint;
            const correctAnswersAll = correctAnswersAudio + correctAnswersSprint;
            const percentageCorrectAll = +((correctAnswersAll / totalAnswersAll) * 100).toFixed(2) || 0;

            return await drawDayStatistics(
                firstTimeInGameAll,
                percentageCorrectAll,
                firstTimeInGameAudio,
                percentageCorrectAudio,
                bestSeriesOfAnswersAudio,
                firstTimeInGameSprint,
                percentageCorrectSprint,
                bestSeriesOfAnswersSprint,
                bestScore
            );
        } else {
            return await drawDayStatistics(0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
    }
}

async function drawDayStatistics(
    firstTimeInGameAll: number,
    percentageCorrectAll: number,
    firstTimeInGameAudio: number,
    percentageCorrectAudio: number,
    bestSeriesOfAnswersAudio: number,
    firstTimeInGameSprint: number,
    percentageCorrectSprint: number,
    bestSeriesOfAnswersSprint: number,
    bestScore: number
) {
    return `<div class="daystatistics">

	            <h2 class="daystatistics__title">Дневная статистика: ${todayDate}</h2>

	            <div class="daystatistics__body">
	            	<div class="daystatistics__allgames allgames-day">
	            		<p class="allgames-day__total">
	            			Общее количество новых слов:
	            			<span class="allgames-day__number">${firstTimeInGameAll}</span>
	            		</p>
                        <p class="allgames-day__easy">
                            Общее количество изученных слов:
                            <span class="allgames-day__number">${await getEasyWordsPerDay()}</span>
                    </p>
	            		<p class="allgames-day__percentage">
	            			Общий процент правильных ответов:
	            			<span class="allgames-day__number">${percentageCorrectAll}</span>
	            		</p>
	            	</div>

	            	<div class="daystatistics__audiochallenge audiochallenge-day">
                        <h2 class="audiochallenge-day__title">Аудиовызов</h2>
	            		<p class="audiochallenge-day__total">
	            			Количество новых слов:
	            			<span class="audiochallenge-day__number">${firstTimeInGameAudio}</span>
	            		</p>
	            		<p class="audiochallenge-day__percentage">
	            			Процент правильных ответов:
	            			<span class="audiochallenge-day__number">${percentageCorrectAudio}</span>
	            		</p>
	            		<p class="audiochallenge-day__series">
	            			Лучшая серия правильных ответов:
	            			<span class="audiochallenge-day__number">${bestSeriesOfAnswersAudio}</span>
	            		</p>
	            	</div>

	            	<div class="daystatistics__sprint sprint-day">
                        <h2 class="sprint-day__title">Спринт</h2>
	            		<p class="sprint-day__total">
                            Количество новых слов:
	            			<span class="sprint-day__number">${firstTimeInGameSprint}</span>
	            		</p>
	            		<p class="sprint-day__percentage">
	            			Процент правильных ответов:
	            			<span class="sprint-day__number">${percentageCorrectSprint}</span>
	            		</p>
	            		<p class="sprint-day__series">
	            			Лучшая серия правильных ответов:
	            			<span class="sprint-day__number">${bestSeriesOfAnswersSprint}</span>
	            		</p>
	            		<p class="sprint-day__score">
	            			Лучший счёт:
	            			<span class="sprint-day__number">${bestScore}</span>
	            		</p>
	            	</div>
	            </div>

            </div>
    `;
}

async function renderLongtermStatistics() {
    return drawLongtermStatistics();
}

function drawLongtermStatistics() {
    return `
    <div class="longtermstatistics">

	    <h2 class="longtermstatistics__title">Долгосрочная статистика</h2>

	    <div class="longtermstatistics__body">

            <div class="longtermstatistics__graph" style="background-color: rgb(229, 241, 248);">
                <canvas id="graph-firstTimeInGame"></canvas>
            </div>

            <div class="longtermstatistics__graph" style="background-color: rgb(229, 241, 248);">
                <canvas id="graph-easyPerDay"></canvas>
            </div>

            <div class="longtermstatistics__graph" style="background-color: rgb(229, 241, 248);">
                <canvas id="graph-persentage"></canvas>
            </div>

            <div class="longtermstatistics__graph" style="background-color: rgb(229, 241, 248);">
                <canvas id="graph-bestScore"></canvas>
            </div>
	    </div>

</div>
    `;
}

async function getEasyWordsPerDay() {
    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;

        let easyWordsPerDay;

        const allUserStatistics = (await getStatistics(userId, userToken)) as IStatisticsResult;
        console.log(allUserStatistics);

        //! если у пользователя уже ЕСТЬ статистика:
        if (allUserStatistics) {
            const allDaysStatisticsList = allUserStatistics.optional.allDaysStatistics.days;
            console.log(allDaysStatisticsList);

            //! получаю из статистики СЕГОДНЯШНЮЮ дату:
            const todayStatistics = allDaysStatisticsList.filter((arr) => arr[arr.length - 1] === todayDate);
            console.log(todayStatistics);

            if (todayStatistics.length > 0) {
                //! если в статистике ЕСТЬ сегодняшняя дата:
                console.log('i have todayStatistics');
                const todayEasyWordsTotal = todayStatistics[0][5] as number;
                console.log(todayEasyWordsTotal);

                if (allDaysStatisticsList.length > 1) {
                    //! если в статистике ЕСТЬ ПРЕДЫДУЩИЙ день:
                    const previousEasyWordsTotal = allDaysStatisticsList[allDaysStatisticsList.length - 2][5] as number;
                    console.log(previousEasyWordsTotal);
                    const difference = todayEasyWordsTotal - previousEasyWordsTotal;
                    if (difference > 0) {
                        easyWordsPerDay = difference;
                    } else {
                        easyWordsPerDay = 0;
                    }
                } else {
                    //! если в статистике НЕТ ПРЕДЫДУЩЕГО дня:
                    easyWordsPerDay = todayEasyWordsTotal;
                }
            } else {
                //! если в статистике НЕТ сегодняшней даты:
                console.log('i have NO todayStatistics');
                easyWordsPerDay = 0;
            }
        } else {
            //! если у пользователя ещё НЕТ статистики:
            easyWordsPerDay = 0;
        }

        return easyWordsPerDay;
    } else {
        console.log('Пользователь не авторизован - getEasyWordsPerDay');
    }
}

// console.log(await getEasyWordsPerDay());
