import MovieCardView from '../view/movie-card-view.js';
import PopupView from '../view/popup-view.js';
import {renderElement, RenderPosition, replace, remove} from '../util/render.js';
import EmojiListView from '../view/emoji-list-view.js';

const CLASS_OVERFLOW_HIDDEN = 'hide-overflow';
const EMPTY_COMMENTS_LIST = 0;
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
  #scrollValue = null;

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

    if (this.#movieContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  };

  #renderPopup = (popup) => {
    const saveScroll = () => (this.#scrollValue = popup.element.scrollTop);

    popup.element.addEventListener('scroll', saveScroll);

    const popupCloseButtonNode = popup.element.querySelector('.film-details__close-btn');
    const emojiContainer = popup.element.querySelector('.film-details__new-comment');

    this.#body.classList.add(CLASS_OVERFLOW_HIDDEN);

    renderElement(this.#body, popup, RenderPosition.BEFOREEND);
    renderElement(emojiContainer, new EmojiListView(), RenderPosition.BEFOREEND);

    popup.element.scrollTo(0, this.#scrollValue);

    // if (movie.comments.length !== EMPTY_COMMENTS_LIST) {
    //   renderElement(emojiContainer, new CommentsListView(movieCommentsList), RenderPosition.BEFOREBEGIN);
    // }

    const closePopup = () => {
      this.#popupComponent.element.remove();
      this.#body.classList.remove(CLASS_OVERFLOW_HIDDEN);
      this.#scrollValue = null;
      popupCloseButtonNode.removeEventListener('click', popupClickCloseHandler);
      document.removeEventListener('keydown', popupKeydownCloseHandler);
      popup.element.removeEventListener('scroll', saveScroll);
    };

    function popupClickCloseHandler() {
      closePopup();
    }

    function popupKeydownCloseHandler(evt) {
      if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
        evt.preventDefault();
        closePopup();
      }
    }

    this.#popupComponent.setClickCloseHandler(() => {
      popupClickCloseHandler();
    });

    document.addEventListener('keydown' , popupKeydownCloseHandler);
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
    this.#renderPopup(this.#popupComponent);
  };

  #handlerPopupWatchedClick = () => {
    this.#handlerWatchedClick();
    this.#renderPopup(this.#popupComponent);
  };

  #handlerPopupFavoriteClick = () => {
    this.#handlerFavoriteClick();
    this.#renderPopup(this.#popupComponent);
  };
}

export default MoviePresenter;
