import { getStatistics } from '../components/api/api';
import { drawGraphic } from '../components/statistics/graphics';
import { contentStatisticsPage } from '../components/statistics/statistics-render';
import { LOCAL_STORAGE_DATA } from '../constants/constants';
import { IStatisticsResult } from '../types/types';

export const Statistic = async (): Promise<string> => {
    return await contentStatisticsPage();
};

export const StatisticCallback = async () => {
    const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
    if (isAuthorized) {
        const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
        const userToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;

        const allUserStatistics = (await getStatistics(userId, userToken)) as IStatisticsResult;
        console.log(allUserStatistics);

        if (allUserStatistics) {
            const allDaysStatisticsList = allUserStatistics.optional.allDaysStatistics.days;
            console.log(allDaysStatisticsList);

            const allDates = allDaysStatisticsList.map((arr) => arr[arr.length - 1] as string);
            console.log(allDates);
            const allFirstInGame = allDaysStatisticsList.map((arr) => arr[4] as number);
            console.log(allFirstInGame);

            drawGraphic(
                'graph-firstTimeInGame',
                allDates,
                'Новые слова за каждый день',
                '#CD4B3C',
                allFirstInGame,
                'line'
            );

            const allEasyPerDay = allDaysStatisticsList.map((arr) => arr[5] as number);
            console.log(allEasyPerDay);

            drawGraphic(
                'graph-easyPerDay',
                allDates,
                'Изученные слова за каждый день',
                '#CD4B3C',
                allEasyPerDay,
                'line'
            );

            const allPercentage = allDaysStatisticsList.map((arr) => {
                const percentage = +(((arr[1] as number) / (arr[0] as number)) * 100).toFixed(2) || 0;
                return percentage;
            });
            console.log(allPercentage);

            drawGraphic(
                'graph-persentage',
                allDates,
                'Процент правильных ответов за каждый день',
                '#CD4B3C',
                allPercentage,
                'line'
            );

            const allBestScore = allDaysStatisticsList.map((arr) => arr[3] as number);
            console.log(allBestScore);

            drawGraphic('graph-bestScore', allDates, 'Лучший счёт за каждый день', '#CD4B3C', allBestScore, 'line');
        }
    }
};
