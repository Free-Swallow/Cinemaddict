import AbstractView from './abstract-view.js';
import {FilterType} from '../util/const';

const NoMoviesTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCH_LIST]: 'There are no movies to watch now',
  [FilterType.FAVORITE]: 'There are no favorite movies now',
  [FilterType.HISTORY]: 'There are no watched movies now',
};

const createMovieListEmptyTitle = (filterType) => (
  `<h2 class="films-list__title">${NoMoviesTextType[filterType]}</h2>`
);

class MoviesListEmptyTitle extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createMovieListEmptyTitle(this._data);
  }
}

export default MoviesListEmptyTitle;
