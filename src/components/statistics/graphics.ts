import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  ChartTypeRegistry
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

// Что передается в функцию: id - id элемента canvas, в котором будет нарисован график; labels - метки к каждой точке на нижней оси (например,
// если это график по дням, то это должен быть массив строчек с отдельными датами); label - название графика; color - цвет графика (ргб или любой другой формат, строкой);
// numbers - собственно, массив цифр, координат точек по вертикальной оси); type - тип графика, line для линии и bar для диаграммы со столбиками)

export function drawGraphic(id: string, labels: Array<string>, label: string, color: string, numbers: Array<number>, type: 'line' | 'bar') {

  const data = {
    labels: labels,
    datasets: [{
      label: label,
      backgroundColor: color,
      borderColor: color,
      data: numbers,
    }]
  };

  const config = {
    type: type as keyof ChartTypeRegistry,
    data: data,
    options: {    scales: {
      y: {
        beginAtZero: true
      }
    }}
  };

  const myChart = new Chart(
    document.getElementById(id) as HTMLCanvasElement,
    config
  );
}