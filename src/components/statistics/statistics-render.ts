import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { getStatistics } from '../api/api';
import { IStatisticsResult } from '../../types/types';
import { getTodayDate } from '../../general-functions/getTodayDate';

const todayDate = getTodayDate();

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
            totalAnswersAudio = allUserStatistics.optional.lastDayStatistics.audiochallenge.totalAnswers;
            correctAnswersAudio = allUserStatistics.optional.lastDayStatistics.audiochallenge.correctAnswers;
            percentageCorrectAudio = +((correctAnswersAudio / totalAnswersAudio) * 100).toFixed(2);
            bestSeriesOfAnswersAudio = allUserStatistics.optional.lastDayStatistics.audiochallenge.bestSeriesOfAnswers;
        } else {
            totalAnswersAudio = 0;
            correctAnswersAudio = 0;
            percentageCorrectAudio = 0;
            bestSeriesOfAnswersAudio = 0;
        }

        if (allUserStatistics.optional.lastDayStatistics.sprint.latestDate === todayDate) {
            totalAnswersSprint = allUserStatistics.optional.lastDayStatistics.sprint.totalAnswers;
            correctAnswersSprint = allUserStatistics.optional.lastDayStatistics.sprint.correctAnswers;
            percentageCorrectSprint = +((correctAnswersSprint / totalAnswersSprint) * 100).toFixed(2);
            bestSeriesOfAnswersSprint = allUserStatistics.optional.lastDayStatistics.sprint.bestSeriesOfAnswers;
            bestScore = allUserStatistics.optional.lastDayStatistics.sprint.bestScore as number;
        } else {
            totalAnswersSprint = 0;
            correctAnswersSprint = 0;
            percentageCorrectSprint = 0;
            bestSeriesOfAnswersSprint = 0;
            bestScore = 0;
        }

        const totalAnswersAll = totalAnswersAudio + totalAnswersSprint;
        const correctAnswersAll = correctAnswersAudio + correctAnswersSprint;
        const percentageCorrectAll = +((correctAnswersAll / totalAnswersAll) * 100).toFixed(2);

        return drawDayStatistics(
            totalAnswersAll,
            percentageCorrectAll,
            totalAnswersAudio,
            percentageCorrectAudio,
            bestSeriesOfAnswersAudio,
            totalAnswersSprint,
            percentageCorrectSprint,
            bestSeriesOfAnswersSprint,
            bestScore
        );
    }
}

function drawDayStatistics(
    totalAnswersAll: number,
    percentageCorrectAll: number,
    totalAnswersAudio: number,
    percentageCorrectAudio: number,
    bestSeriesOfAnswersAudio: number,
    totalAnswersSprint: number,
    percentageCorrectSprint: number,
    bestSeriesOfAnswersSprint: number,
    bestScore: number
) {
    return `<div class="daystatistics">

	            <h2 class="daystatistics__title">Дневная статистика: ${todayDate}</h2>

	            <div class="daystatistics__body">
	            	<div class="daystatistics__allgames allgames-day">
	            		<p class="allgames-day__total">
	            			Всего изучалось слов:
	            			<span class="allgames-day__number">${totalAnswersAll}</span>
	            		</p>
	            		<p class="allgames-day__percentage">
	            			Общий процент правильных ответов:
	            			<span class="allgames-day__number">${percentageCorrectAll}</span>
	            		</p>
	            	</div>

	            	<div class="daystatistics__audiochallenge audiochallenge-day">
                        <h2 class="audiochallenge-day__title">Аудиовызов</h2>
	            		<p class="audiochallenge-day__total">
	            			Изучалось слов:
	            			<span class="audiochallenge-day__number">${totalAnswersAudio}</span>
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
	            			Изучалось слов:
	            			<span class="sprint-day__number">${totalAnswersSprint}</span>
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
            МЕСТО ДЛЯ ГРАФИКОВ
	    </div>

</div>
    `;
}
