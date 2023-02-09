import {convertTime} from '../util/util.js';
import SmartView from './smart-view.js';
import {KeyCode} from '../util/const.js';

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
  isEmojiChecked
}) => {
  const createEmojiInput = () => emojiList
    .map((emoji) => (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${isEmojiChecked === `emoji-${emoji}` ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
            </label>`)
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
              <td class="film-details__cell">${director.join(', ')}</td>
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
              <td class="film-details__cell">${year}</td>
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>



        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${userEmoji}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${userMessage}</textarea>
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

    this.setFormSubmitHandler(this.#commentSubmit);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._data, this.#commentList);
  }

  reset = (movie) => {
    this.updateData(PopupView.parseMovieToData(movie),);
  };

  #commentSubmit = () => {
    this.#comment.disabled = true;
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setClickCloseHandler(this._callback.clickClose);
    this.setClickWatchlistHandler(this._callback.clickWatchlist);
    this.setClickWatchedHandler(this._callback.clickWatched);
    this.setClickFavoriteHandler(this._callback.clickFavorite);
  };

  #onEnterKeyDown = (evt) => {
    if (evt.key === KeyCode.ENTER && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      this._callback.formSubmit(PopupView.parseDataToMovie(this._data));
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

  setNewCommentsSubmit = (callback) => {
    this._callback.commentSubmit = callback;
    this.#comment = this.element
      .querySelector('.film-details__comment-input');
    this.#comment.addEventListener('keydown', this.#onEnterKeyDown);
  }

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
        isEmojiChecked: evt.target.id,
      });
    }
  };

  #messageInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      userMessage: evt.target.value,
    }, true);
  };

  static parseMovieToData = (Movie) => ({...Movie,
    userEmoji: '',
    userMessage: '',
    isEmojiChecked: '',
  });

  static parseDataToMovie = (data) => {
    const movie = {...data};

    delete movie.userEmoji;
    delete movie.userMessage;
    delete movie.isEmojiChecked;

    return movie;
  };
}

export default PopupView;
