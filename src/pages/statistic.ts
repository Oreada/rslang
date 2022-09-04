import { contentStatisticsPage } from '../components/statistics/statistics-render';

export const Statistic = async (): Promise<string> => {
    return contentStatisticsPage();
};

export const StatisticCallback = () => {
    // место для листенеров
};
