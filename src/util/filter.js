import {FilterType} from './const';

const filter = {
  [FilterType.ALL]: (movies) => movies.filter((movie) => movie !== null),
  [FilterType.WATCH_LIST]: (movies) => movies.filter((movie) => movie.isWatchList),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.isWatched),
  [FilterType.FAVORITE]: (movies) => movies.filter((movie) => movie.isFavorite),
};

export {filter};
