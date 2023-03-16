import SmartView from './smart-view.js';
import {StatisticTime} from '../util/const.js';
import {getUserRating} from '../util/util.js';
import {convertTimeForStatistic, getTopGenre, getGenresStatistics, getWatchedMovies} from '../util/statistic.js';
import {ChartValues} from '../util/const.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const initialValue = 0;

const renderChart = (statisticCtx, data) => {
  const chartData = getGenresStatistics(data);
  const movieGenres = [];
  const movieCount = [];

  for (const [genre, count] of Object.entries(chartData)) {
    movieGenres.push(genre);
    movieCount.push(count);
  }

  statisticCtx.height = ChartValues.BAR_HEIGHT * movieGenres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: ChartValues.PLUGIN_TYPE,
    data: {
      labels: movieGenres,
      datasets: [{
        data: movieCount,
        backgroundColor: ChartValues.BACKGROUND_COLOR,
        hoverBackgroundColor: ChartValues.HOVER_BACKGROUND,
        anchor: ChartValues.ANCHOR,
        barThickness: ChartValues.BAR_THICKNESS,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: ChartValues.FONT_SIZE,
          },
          color: ChartValues.FONT_COLOR,
          anchor: ChartValues.FONT_ANCHOR,
          align: ChartValues.FONT_ALIGN,
          offset: ChartValues.FONT_OFFSET,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartValues.SCALES_FONT_COLOR,
            padding: ChartValues.SCALES_PADDING,
            fontSize: ChartValues.SCALES_FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticTemplate = (data, filterData, statisticFilter) => {
  const getTotalTimeHistory = filterData.reduce((sum, currentValue) => sum + Number(currentValue.runtime), initialValue);

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${getUserRating(data)}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${statisticFilter === StatisticTime.ALL_TIME ? 'checked' : ''}>
    <label data-value="${StatisticTime.ALL_TIME}" for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${statisticFilter === StatisticTime.TODAY ? 'checked' : ''}>
    <label data-value="${StatisticTime.TODAY}" for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${statisticFilter === StatisticTime.WEEK ? 'checked' : ''}>
    <label data-value="${StatisticTime.WEEK}" for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${statisticFilter === StatisticTime.MONTH ? 'checked' : ''}>
    <label data-value="${StatisticTime.MONTH}" for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${statisticFilter === StatisticTime.YEAR ? 'checked' : ''}>
    <label data-value="${StatisticTime.YEAR}" for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${filterData.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${filterData !== 0 ? convertTimeForStatistic(getTotalTimeHistory) : '0'}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${getTopGenre(filterData)}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

  </section>`;
};

class StatisticView extends SmartView {
  #data = null;
  #filterData = null;
  #statisticFilter = null;

  constructor(data, statisticFilter) {
    super();
    this.#data = data;
    this.#statisticFilter = statisticFilter;
    this.#filterData = getWatchedMovies(statisticFilter, data);
    this.#setChart();
  }

  get template() {
    return createStatisticTemplate(this.#data, this.#filterData, this.#statisticFilter);
  }

  // HANDLER

  setChangeStatisticFilterHandler = (callback) => {
    this._callback.changeStatisticFilter = callback;
    this.element.querySelector('.statistic__filters')
      .addEventListener('click', this.#changeStatisticFilterHandler);
  };

  #changeStatisticFilterHandler = (evt) => {
    if (evt.target.nodeName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this._callback.changeStatisticFilter(evt.target.dataset.value);
  };

  #setChart = () => {
    const statisticCtx = this.element.querySelector('.statistic__chart');
    renderChart(statisticCtx, this.#filterData);
  };
}

export default StatisticView;
