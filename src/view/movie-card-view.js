import AbstractView from './abstract-view.js';
import {convertTime} from '../util/util.js';

const convertDescription = (str) => {
  if (str.length > 200) {
    return `${str.slice(0, 200).trim()}...`;
  }

  return str;
};

const createMovieCardTemplate = ({
  title,
  rating,
  year,
  runtime,
  genre,
  description,
  comments,
  poster,
  isWatched,
  isFavorite,
  isWatchList
}) => (
  `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${convertTime(runtime)}</span>
              <span class="film-card__genre">${genre.join(', ')}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${convertDescription(description)}</p>
            <span class="film-card__comments">${comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchList ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`
);

class MovieCardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }

  // HANDLER

  setClickCallPopupHandler = (callback) => {
    this._callback.clickCallPopup = callback;
    this.element
      .querySelector('.film-card__link')
      .addEventListener('click', this.#clickCallPopupHandler);
  }

  setClickWatchlistHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
  };

  setClickWatchedHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#clickWatchedHandler);
  };

  setClickFavoriteHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
  };

  #clickCallPopupHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickCallPopup();
  };

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatchlist();
  };

  #clickWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickWatched();
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFavorite();
  };
}

export default MovieCardView;
