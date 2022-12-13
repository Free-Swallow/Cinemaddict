import ProfileView from './view/profile-view.js';
import MainNavView from './view/main-nav-view.js';
import SortListView from './view/sort-list-view.js';
import MoviesSectionView from './view/movies-section-view.js';
import MoviesListTitleView from './view/movies-list-title-view.js';
import MoviesContainerView from './view/movies-container-view.js';
import MovieCardView from './view/movie-card-view.js';
import MoviesListView from './view/movies-list-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FooterStatsView from './view/footer-stats-view.js';
import PopupView from './view/popup-view.js';
import EmojiListView from './view/emoji-list-view.js';
import CommentsListView from './view/comments-list-view.js';
import {RenderPosition, renderElement} from './util/render.js';
import {createMovieList, createCommentList} from './mock/mock.js';
import {findComments} from './util/util.js';

const movieList = createMovieList();
const commentList = createCommentList();

const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_COUNT_START = 4;
const EMPTY_COMMENTS_LIST = 0;
const CLASS_OVERFLOW_HIDDEN = 'hide-overflow';
const ESCAPE_KEY = 'Escape';

const bodyNode = document.querySelector('body');
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');
const footerStatisticsNode = footerNode.querySelector('.footer__statistics');

const moviesSectionComponent = new MoviesSectionView();
const moviesListComponent = new MoviesListView();
const moviesContainerComponent = new MoviesContainerView();

// Отрисовка Поп-апа

const renderPopup = (movie) => {
  const popupComponent = new PopupView(movie);
  const movieCommentsList = findComments(commentList, movie.comments);

  bodyNode.classList.add(CLASS_OVERFLOW_HIDDEN);

  renderElement(document.body, popupComponent.element, RenderPosition.BEFOREEND);

  const popupCloseButtonNode = popupComponent.element.querySelector('.film-details__close-btn');
  const emojiContainer = popupComponent.element.querySelector('.film-details__new-comment');

  renderElement(emojiContainer, new EmojiListView().element, RenderPosition.BEFOREEND);

  if (movie.comments.length !== EMPTY_COMMENTS_LIST) {
    renderElement(emojiContainer, new CommentsListView(movieCommentsList).element, RenderPosition.BEFOREBEGIN);
  }

  const popupClickCloseHandler = () => closePopup();
  const popupKeydownCloseHandler = (evt) => {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closePopup();
    }
  };

  function closePopup() {
    popupComponent.element.remove();
    bodyNode.classList.remove(CLASS_OVERFLOW_HIDDEN);
    popupCloseButtonNode.removeEventListener('click', popupClickCloseHandler);
    document.removeEventListener('keydown', popupKeydownCloseHandler);
  }

  popupCloseButtonNode.addEventListener('click', popupClickCloseHandler);
  document.addEventListener('keydown' , popupKeydownCloseHandler);
};

// Отрисовка карточки фильма

const renderMovieCard = (container, movie) => {
  const newMovieComponent = new MovieCardView(movie);
  const movieLink = newMovieComponent.element.querySelector('.film-card__link');

  movieLink.addEventListener('click', () => {
    renderPopup(movie);
  });

  renderElement(container, newMovieComponent.element, RenderPosition.BEFOREEND);
};

renderElement(headerNode, new ProfileView().element, RenderPosition.BEFOREEND);
renderElement(mainNode, new MainNavView(movieList).element, RenderPosition.AFTERBEGIN);
renderElement(mainNode, new SortListView().element, RenderPosition.BEFOREEND);
renderElement(mainNode, moviesSectionComponent.element, RenderPosition.BEFOREEND);
renderElement(moviesSectionComponent.element, moviesListComponent.element, RenderPosition.BEFOREEND);
renderElement(footerStatisticsNode, new FooterStatsView(movieList.length).element, RenderPosition.AFTERBEGIN);
renderElement(moviesListComponent.element, new MoviesListTitleView().element, RenderPosition.AFTERBEGIN);
renderElement(moviesListComponent.element, moviesContainerComponent.element, RenderPosition.BEFOREEND);

for (let i = 0; i <= Math.min(movieList.length, MOVIES_COUNT_START); i++) {
  renderMovieCard(moviesContainerComponent.element, movieList[i]);
}

if (movieList.length > MOVIES_COUNT_PER_STEP) {
  let renderMovieCount = MOVIES_COUNT_PER_STEP;

  renderElement(moviesListComponent.element, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);

  const buttonShowMoreNode = mainNode.querySelector('.films-list__show-more');

  buttonShowMoreNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    movieList
      .slice(renderMovieCount, renderMovieCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => renderMovieCard(moviesContainerComponent.element, movie));

    renderMovieCount += MOVIES_COUNT_PER_STEP;

    if (renderMovieCount >= movieList.length) {
      buttonShowMoreNode.remove();
    }
  });
}

// for (let i = 0; i <= 1; i++) {
//   renderTemplate(filmsCardListExtraSecondNode, createFilmCardTemplate(movieList
//     .slice()
//     .sort((a, b) => b.rating - a.rating)[i]), RenderPosition.BEFOREEND);
// }
//
