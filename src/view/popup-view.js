import {convertCommentDate, convertTime, formatDate} from '../util/util.js';
import SmartView from './smart-view.js';
import {KeyCode} from '../util/const.js';
import he from 'he';
import {renderToast} from '../util/toast.js';

const emojiList = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const createPopupTemplate = ({
  comments,
  ageLimit,
  title,
  titleOriginal,
  rating,
  description,
  isFavorite,
  isWatched,
  isWatchList,
  director,
  writers,
  actors,
  year,
  runtime,
  country,
  poster,
  genre,
  userEmoji,
  userMessage,
  isEmojiChecked,
  isDeleting,
  isDisabled,
  idCommentError,
}, commentsData) => {
  const createEmojiInput = () => emojiList
    .map((emoji) => (
      `<input ${isDisabled ? 'disabled' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${isEmojiChecked === `emoji-${emoji}` ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
            </label>`)
    );

  const createComment = (list) => list.map(({emotion, date, comment, author, id}) => (`<li data-id="${id}" class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${convertCommentDate(date)}</span>
                <button data-id="${id}" class="film-details__comment-delete" ${isDisabled ? 'disabled' : ''}>${isDeleting && idCommentError === id ? 'Deleting...' : 'Delete'}</button>
              </p>
            </div>
          </li>`)).join('');

  const createCommentsListTemplate = (list) => (
    `<ul class="film-details__comments-list">
    ${createComment(list)}
        </ul>`
  );

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageLimit}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${titleOriginal}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatDate(year, 'YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${convertTime(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genre.map((item) => `<span class="film-details__genre">${item}</span>`).join('')}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isWatchList ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsData.length}</span></h3>

        ${comments.length !== 0 ? createCommentsListTemplate(commentsData) : ''}

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${userEmoji}</div>

          <label class="film-details__comment-label">
            <textarea ${isDisabled ? 'disabled' : ''} class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(userMessage)}</textarea>
          </label>

          <div class="film-details__emoji-list">
            ${createEmojiInput().join('')}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

class PopupView extends SmartView {
  #commentList = null;
  #comment = null;

  constructor(movie, commentList) {
    super();
    this._data = PopupView.parseMovieToData(movie);
    this.#commentList = commentList;

    this.#setInnerHandlers();
    this.setDeleteCommentHandler();
  }

  get template() {
    return createPopupTemplate(this._data, this.#commentList);
  }

  reset = (movie) => {
    this.updateData(PopupView.parseMovieToData(movie),);
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setClickCloseHandler(this._callback.clickClose);
    this.setClickWatchlistHandler(this._callback.clickWatchlist);
    this.setClickWatchedHandler(this._callback.clickWatched);
    this.setClickFavoriteHandler(this._callback.clickFavorite);
    this.setDeleteCommentHandler(this._callback.deleteComment);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #onEnterKeyDown = (evt) => {
    if (evt.ctrlKey && evt.code === KeyCode.ENTER) {
      if (this._data.userMessage.length === 0 || this._data.isEmojiChecked.length === 0) {
        renderToast('Напишиет комментарий и выберите эмодзи.');
        this.shakeComment();
        return;
      }

      evt.preventDefault();
      this._callback.formSubmit({
        comment: this._data.userMessage,
        emotion: this._data.isEmojiChecked,
      });
      PopupView.parseDataToMovie(this._data);
    }
  };

  // HANDLER

  setClickCloseHandler = (callback) => {
    this._callback.clickClose = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#clickCloseHandler);
  }

  setClickWatchlistHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
  };

  setClickWatchedHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#clickWatchedHandler);
  };

  setClickFavoriteHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.#comment = this.element.querySelector('.film-details__comment-input');
    this.#comment.addEventListener('keydown', this.#onEnterKeyDown);
  }

  setDeleteCommentHandler = (callback) => {
    this._callback.deleteComment = callback;

    if (this.#commentList.length !== 0) {
      this.element
        .querySelector('.film-details__comments-list')
        .addEventListener('click', this.#deleteCommentHandler);
    }
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.film-details__emoji-list')
      .addEventListener('input', this.#selectEmojiHandler);
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#messageInputHandler);
  }

  #clickCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickClose();
  }

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

  #selectEmojiHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.nodeName === 'INPUT') {

      this.updateData({
        userEmoji: `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}">`,
        isEmojiChecked: evt.target.value,
      });
    }
  };

  #deleteCommentHandler = (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
      evt.preventDefault();

      const commentId = evt.target.dataset.id;
      const currentComment = this.#commentList.filter((com) => Number(com.id) === Number(commentId))[0];

      this._callback.deleteComment(currentComment);
    }
  };

  #messageInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      userMessage: evt.target.value,
    }, true);
  };

  shakeComment = (id) => {
    const commentList = this.element.querySelector('.film-details__comments-list').children;

    for (const com of commentList) {
      if (Number(com.dataset.id) === Number(id)) {
        this.shakeInnerItem(com);
      }
    }
  };

  static parseMovieToData = (Movie) => ({...Movie,
    userEmoji: '',
    userMessage: '',
    isEmojiChecked: '',
    isDeleting: false,
    isDisabled: false,
    idCommentError: null,
  });

  static parseDataToMovie = (data) => {
    const movie = {...data};

    delete movie.userEmoji;
    delete movie.userMessage;
    delete movie.isEmojiChecked;
    delete movie.isDisabled;
    delete movie.isDisabled;
    delete movie.idCommentError;

    return movie;
  };
}

export default PopupView;
