import {convertTime} from './util';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FilterType, StatisticTime} from './const';
import {filter} from './filter';
dayjs.extend(duration);
dayjs.extend(relativeTime);

const TimeInterval = {
  [StatisticTime.ALL_TIME]: 'All time',
  [StatisticTime.TODAY]: 1,
  [StatisticTime.WEEK]: 7,
  [StatisticTime.MONTH]: 30,
  [StatisticTime.YEAR]: 365,
};

const isCheckString = (string) => !!((string.match(/[a-z]/) || string.match(/[A-Z]/)));

const convertTimeForStatistic = (time) => {
  const string = String(convertTime(time));
  const convertString = [];

  for (const symbol of string) {
    isCheckString(symbol) ? convertString.push(` <span class="statistic__item-description">${symbol}</span> `) : convertString.push(symbol);
  }

  return convertString.join('');
};

const isCheckTimeInterval = (interval, checkTime) => dayjs().add(-interval, 'day').toDate() <= checkTime;

const getListTimeInterval = (statisticFilter, data) => {
  if (statisticFilter === StatisticTime.ALL_TIME) {
    return data;
  }

  return data.filter((movie) => isCheckTimeInterval(TimeInterval[statisticFilter], movie.watchingDate));
};

const getGenresStatistics = (movies) => {
  const genresStatistics = {};

  movies
    .reduce((acc, movie) => acc.concat(movie.genre), [])
    .forEach((genre) => {
      if (genresStatistics[genre]) {
        genresStatistics[genre]++;
        return;
      }
      genresStatistics[genre] = 1;
    });

  return genresStatistics;
};

const getTopGenre = (films) => {
  if (films.length === 0) {
    return '';
  }

  const genresStatistics = getGenresStatistics(films);
  const topGenreStatistics = Object.entries(genresStatistics).sort((a, b) => b[1] - a[1])[0];

  return topGenreStatistics[0];
};

const createListTimeInterval = (statisticFilter, data) => getListTimeInterval(statisticFilter, data);
const getWatchedMovies = (statisticFilter, data) => filter[FilterType.HISTORY](createListTimeInterval(statisticFilter, data));

export {convertTimeForStatistic, getListTimeInterval, getTopGenre, getGenresStatistics, getWatchedMovies};
