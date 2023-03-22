import CommentsModel from '../model/comments-model';
import {remove, renderElement, RenderPosition, replace} from '../util/render';
import PopupView from '../view/popup-view';
import {UpdateType, UserActions, State, KeyCode, CLASS_OVERFLOW_HIDDEN} from '../util/const';
import {renderToast} from '../util/toast';

class PopupPresenter {
  #popupContainer = null;
  #popupComponent = null;
  #movie = null;
  #changeData = null;
  #scrollValue = null;
  #commentsModel = null;
  #commentsApi = null;
  #clearPopup = null;

  constructor(popupContainer, changeData, commentsApi, clearPopup) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#commentsApi = commentsApi;
    this.#clearPopup = clearPopup;

    this.#commentsModel = new CommentsModel(this.#commentsApi);
  }

  init = (movie) => {
    this.#movie = movie;

    const prevPopupComponent = this.#popupComponent;

    this.#commentsApi.comments(this.#movie)
      .then((comments) => {
        this.#commentsModel.comments = comments;
        this.#renderPopup(prevPopupComponent);
      })
      .catch(() => {
        renderToast('Не удалось загрузить комментарии.');
        this.#commentsModel.comments = [];
        this.#renderPopup(prevPopupComponent);
      });
  };

  #renderPopup = (prevPopupComponent) => {
    this.#popupComponent = new PopupView(this.#movie, this.#commentsModel.comments);
    this.#popupContainer.classList.add(CLASS_OVERFLOW_HIDDEN);
    this.#popupComponent.element.addEventListener('scroll', this.#setPopupScrollHandler);
    document.addEventListener('keydown' , this.#popupKeydownCloseHandler);

    this.#setPopupHandlers();

    if (prevPopupComponent === null) {
      renderElement(this.#popupContainer, this.#popupComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#popupContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTop = this.#scrollValue;
    }

    remove(prevPopupComponent);
  };

  #setPopupHandlers = () => {
    this.#popupComponent.setClickCloseHandler(this.#popupClickCloseHandler);
    this.#popupComponent.setClickWatchlistHandler(this.#handlerPopupWatchlistClick);
    this.#popupComponent.setClickWatchedHandler(this.#handlerPopupWatchedClick);
    this.#popupComponent.setClickFavoriteHandler(this.#handlerPopupFavoriteClick);
    this.#popupComponent.setDeleteCommentHandler(this.#handlerDeleteComment);
    this.#popupComponent.setFormSubmitHandler(this.#handlerAddComment);
  };

  #setPopupScrollHandler = () => {
    this.#scrollValue = this.#popupComponent.element.scrollTop;
  };

  setViewState = (state, idComment) => {
    switch (state) {
      case State.SAVING:
        this.#popupComponent.updateData({
          isDisabled: true,
        });
        break;
      case State.DELETING:
        this.#popupComponent.updateData({
          isDisabled: true,
          isDeleting: true,
          idCommentError: idComment,
        });
        break;
      case State.ABORTING:
        this.#popupComponent.updateData({
          isDisabled: false,
          isDeleting: false,
          idCommentError: null,
        });
        this.#popupComponent.shake();
        break;
    }
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#popupComponent.updateData({
        isDisabled: false,
        isDeleting: false,
        idCommentError: null,
      });
    };

    this.#popupComponent.shake(resetFormState);
  }

  #popupClickCloseHandler = () => {
    this.#closePopup();
  };

  #popupKeydownCloseHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #closePopup = () => {
    this.#popupComponent.reset(this.#movie);
    this.#popupComponent.element.remove();

    this.#scrollValue = 0;
    this.#commentsModel.comments = [];
    this.#clearPopup();

    this.#popupContainer.classList.remove('hide-overflow');
    this.#popupContainer.classList.remove(CLASS_OVERFLOW_HIDDEN);

    document.removeEventListener('keydown', this.#popupKeydownCloseHandler);
  };

  #handlerPopupWatchlistClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isWatchList: !this.#movie.isWatchList}
    );
  };

  #handlerDeleteComment = (comment) => {
    this.#commentsModel.deleteComment(UserActions.DELETE_COMMENT, comment)
      .then(() => {
        this.#changeData(
          UserActions.DELETE_COMMENT,
          UpdateType.MINOR,
          {...this.#movie, comments: this.#movie.comments.filter((currentComment) => currentComment !== comment.id)},
          comment.id,
        );
      })
      .catch(() => {
        this.#popupComponent.shakeComment(comment.id);
      });
  };

  #handlerAddComment = (comment) => {
    this.#commentsModel.addComment(UserActions.ADD_COMMENT, comment, this.#movie)
      .then(() => {
        this.#changeData(
          UserActions.ADD_COMMENT,
          UpdateType.MINOR,
          this.#movie,
        );
      })
      .catch(() => {
        renderToast('Не удалось добавить комментарий');
        this.setAborting();
      });
  };

  #handlerPopupWatchedClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isWatched: !this.#movie.isWatched}
    );
  };

  #handlerPopupFavoriteClick = () => {
    this.#changeData(
      UserActions.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isFavorite: !this.#movie.isFavorite}
    );
  };
}

export default PopupPresenter;
