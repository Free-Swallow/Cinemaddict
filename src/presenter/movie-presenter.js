import MovieCardView from '../view/movie-card-view.js';
import PopupView from '../view/popup-view.js';
import {renderElement, RenderPosition, replace, remove} from '../util/render.js';

const CLASS_OVERFLOW_HIDDEN = 'hide-overflow';
// const EMPTY_COMMENTS_LIST = 0;
const KeyCode = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

class MoviePresenter {
  #movieContainer = null;
  #movieComponent = null;
  #popupComponent = null;
  #body = document.querySelector('body');
  #movie = null;
  #changeData = null;

  constructor(movieContainer, changeData) {
    this.#movieContainer = movieContainer;
    this.#changeData = changeData;
  }

  init = (movieData) => {
    this.#movie = movieData;

    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#movieComponent = new MovieCardView(this.#movie);
    this.#popupComponent = new PopupView(this.#movie);

    const createPopupHandler = () => {
      this.#closeOtherPopup();
      this.#renderPopup(this.#popupComponent);
    };

    this.#movieComponent.setClickCallPopupHandler(createPopupHandler);
    this.#popupComponent.setClickCloseHandler(this.#popupClickCloseHandler);

    this.#movieComponent.setClickWatchlistHandler(this.#handlerWatchlistClick);
    this.#movieComponent.setClickWatchedHandler(this.#handlerWatchedClick);
    this.#movieComponent.setClickFavoriteHandler(this.#handlerFavoriteClick);

    this.#popupComponent.setClickWatchlistHandler(this.#handlerPopupWatchlistClick);
    this.#popupComponent.setClickWatchedHandler(this.#handlerPopupWatchedClick);
    this.#popupComponent.setClickFavoriteHandler(this.#handlerPopupFavoriteClick);

    if (this.#movieComponent === null || prevPopupComponent === null) {
      renderElement(this.#movieContainer, this.#movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#movieContainer.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (this.#body.contains(prevPopupComponent.element)) {
      const scrollValue = prevPopupComponent.element.scrollTop;
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTop = scrollValue;
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  };

  #closePopup = () => {
    const popupCloseButtonNode = this.#popupComponent.element.querySelector('.film-details__close-btn');

    this.#popupComponent.reset(this.#movie);
    this.#popupComponent.element.remove();
    this.#body.classList.remove(CLASS_OVERFLOW_HIDDEN);
    popupCloseButtonNode.removeEventListener('click', this.#popupClickCloseHandler);
    document.removeEventListener('keydown', this.#popupKeydownCloseHandler);
  };

  #popupClickCloseHandler = () => {
    this.#closePopup();
  };

  #popupKeydownCloseHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #renderPopup = () => {
    // const emojiContainer = this.#popupComponent.element.querySelector('.film-details__new-comment');
    this.#body.classList.add(CLASS_OVERFLOW_HIDDEN);
    renderElement(this.#body, this.#popupComponent, RenderPosition.BEFOREEND);
    // if (movie.comments.length !== EMPTY_COMMENTS_LIST) {
    //   renderElement(emojiContainer, new CommentsListView(movieCommentsList), RenderPosition.BEFOREBEGIN);
    // }
    document.addEventListener('keydown' , this.#popupKeydownCloseHandler);
  }

  #closeOtherPopup = () => {
    remove(this.#body.querySelector('.film-details'));
  }

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  }

  // HANDLER

  #handlerWatchlistClick = () => {
    this.#changeData({...this.#movie, isWatchList: !this.#movie.isWatchList});
  }

  #handlerWatchedClick = () => {
    this.#changeData({...this.#movie, isWatched: !this.#movie.isWatched});
  };

  #handlerFavoriteClick = () => {
    this.#changeData({...this.#movie, isFavorite: !this.#movie.isFavorite});
  };

  #handlerPopupWatchlistClick = () => {
    this.#handlerWatchlistClick();
  };

  #handlerPopupWatchedClick = () => {
    this.#handlerWatchedClick();
  };

  #handlerPopupFavoriteClick = () => {
    this.#handlerFavoriteClick();
  };
}

export default MoviePresenter;
