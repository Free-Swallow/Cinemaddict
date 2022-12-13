import {createElement} from '../util/render';
import {convertTime} from '../util/util';

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
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchList ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`
);

class MovieCardView {
  #element = null;
  #movie = null;

  constructor(movie) {
    this.#movie = movie;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }

  removeElement() {
    this.#element = null;
  }
}

export default MovieCardView;
