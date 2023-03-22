import MovieCardView from '../view/movie-card-view.js';
import {renderElement, RenderPosition, replace, remove} from '../util/render.js';
import {UserActions, UpdateType} from '../util/const.js';

class MoviePresenter {
  #movieContainer = null;
  #movieComponent = null;
  #movie = null;
  #changeData = null;
  #apiComments = null;

  constructor(movieContainer, changeData, apiComments) {
    this.#movieContainer = movieContainer;
    this.#changeData = changeData;
    this.#apiComments = apiComments;
  }

  init = (movieData) => {
    this.#movie = movieData;

    const prevMovieComponent = this.#movieComponent;

    this.#movieComponent = new MovieCardView(this.#movie);

    this.#movieComponent.setClickWatchlistHandler(this.#handlerWatchlistClick);
    this.#movieComponent.setClickWatchedHandler(this.#handlerWatchedClick);
    this.#movieComponent.setClickFavoriteHandler(this.#handlerFavoriteClick);

    if (prevMovieComponent === null) {
      renderElement(this.#movieContainer, this.#movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#movieContainer.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    remove(prevMovieComponent);
  };

  _handlerOpenPopup = (callback) => {
    this.#movieComponent.setClickCallPopupHandler(callback);
  };

  destroy = () => {
    remove(this.#movieComponent);
  }

  aborting = () => {
    this.#movieComponent.shake();
  }

  // HANDLER

  #handlerWatchlistClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isWatchList: !this.#movie.isWatchList}
    );
  }

  #handlerWatchedClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isWatched: !this.#movie.isWatched}
    );
  };

  #handlerFavoriteClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isFavorite: !this.#movie.isFavorite}
    );
  };
}

export default MoviePresenter;
