import MovieCardView from '../view/movie-card-view.js';
import PopupView from '../view/popup-view.js';
import {renderElement, RenderPosition, replace, remove} from '../util/render.js';
import CommentsModel from '../model/comments-model.js';
import {findComments} from '../util/util';
import {UserActions, UpdateType} from '../util/const.js';

const CLASS_OVERFLOW_HIDDEN = 'hide-overflow';
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

  constructor(movieContainer, changeData, commentsData) {
    this.#movieContainer = movieContainer;
    this.#changeData = changeData;
    this._allComments = commentsData;
    this._commentsModal = new CommentsModel();
  }

  init = (movieData) => {
    this.#movie = movieData;
    this._commentsModal.comments = findComments(this._allComments.comments, this.#movie.comments);

    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#movieComponent = new MovieCardView(this.#movie);
    this.#popupComponent = new PopupView(this.#movie, this._commentsModal.comments);

    const createPopupHandler = () => {
      this.#closeOtherPopup();
      this.#renderPopup();
    };

    this.#movieComponent.setClickCallPopupHandler(createPopupHandler);
    this.#popupComponent.setClickCloseHandler(this.#popupClickCloseHandler);

    this.#movieComponent.setClickWatchlistHandler(this.#handlerWatchlistClick);
    this.#movieComponent.setClickWatchedHandler(this.#handlerWatchedClick);
    this.#movieComponent.setClickFavoriteHandler(this.#handlerFavoriteClick);

    this.#popupComponent.setClickWatchlistHandler(this.#handlerPopupWatchlistClick);
    this.#popupComponent.setClickWatchedHandler(this.#handlerPopupWatchedClick);
    this.#popupComponent.setClickFavoriteHandler(this.#handlerPopupFavoriteClick);
    this.#popupComponent.setDeleteCommentHandler(this.#handlerDeleteComment);
    this.#popupComponent.setFormSubmitHandler(this.#handlerAddComment);

    this.#popupComponent.element.addEventListener('scroll', () => {
      this.#scrollValue = this.#popupComponent.element.scrollTop;
    });

    if (this.#movieComponent === null || prevPopupComponent === null) {
      renderElement(this.#movieContainer, this.#movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#movieContainer.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (this.#body.contains(prevPopupComponent.element)) {
      this.#scrollValue = prevPopupComponent.element.scrollTop;
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTop = this.#scrollValue;
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  };

  #closePopup = ({resetScrollValue = false} = {}) => {
    if (!resetScrollValue) {
      this.#scrollValue = 0;
    }

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
    this.#body.classList.add(CLASS_OVERFLOW_HIDDEN);
    renderElement(this.#body, this.#popupComponent, RenderPosition.BEFOREEND);
    this.#popupComponent.element.scrollTop = this.#scrollValue;

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

  #handlerPopupWatchlistClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.PATCH,
      {...this.#movie, isWatchList: !this.#movie.isWatchList}
    );
  };

  #handlerDeleteComment = (comment) => {
    this.#changeData(
      UserActions.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this.#movie, comments: this.#movie.comments.filter((currentComment) => currentComment !== comment.id)},
      comment,
    );
  };

  #handlerAddComment = (comment) => {
    this.#changeData(
      UserActions.ADD_COMMENT,
      UpdateType.PATCH,
      {...this.#movie, comments: [...this.#movie.comments, comment.id]},
      comment,
    );
  };

  #handlerPopupWatchedClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.PATCH,
      {...this.#movie, isWatched: !this.#movie.isWatched}
    );
  };

  #handlerPopupFavoriteClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.PATCH,
      {...this.#movie, isFavorite: !this.#movie.isFavorite}
    );
  };
}

export default MoviePresenter;
