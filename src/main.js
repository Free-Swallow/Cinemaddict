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
import MoviesListEmptyTitle from './view/movies-list-empty-title.js';
import {RenderPosition, renderElement, remove} from './util/render.js';
import {createMovieList, createCommentList} from './mock/mock.js';
import {findComments} from './util/util.js';

const movieList = createMovieList();
const commentList = createCommentList();

const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_COUNT_START = 4;
const EMPTY_COMMENTS_LIST = 0;
const CLASS_OVERFLOW_HIDDEN = 'hide-overflow';
const KeyCode = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

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

  renderElement(document.body, popupComponent, RenderPosition.BEFOREEND);

  const popupCloseButtonNode = popupComponent.element.querySelector('.film-details__close-btn');
  const emojiContainer = popupComponent.element.querySelector('.film-details__new-comment');

  renderElement(emojiContainer, new EmojiListView(), RenderPosition.BEFOREEND);

  if (movie.comments.length !== EMPTY_COMMENTS_LIST) {
    renderElement(emojiContainer, new CommentsListView(movieCommentsList), RenderPosition.BEFOREBEGIN);
  }

  const popupClickCloseHandler = () => closePopup();
  const popupKeydownCloseHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
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

  popupComponent.setClickCloseHandler(() => {
    popupClickCloseHandler();

  });

  document.addEventListener('keydown' , popupKeydownCloseHandler);
};

// Отрисовка карточки фильма
const renderMovieCard = (container, movie) => {
  const newMovieComponent = new MovieCardView(movie);
  const createPopupHandler = () => renderPopup(movie);

  newMovieComponent.setClickCallPopupHandler(createPopupHandler);

  renderElement(container, newMovieComponent, RenderPosition.BEFOREEND);
};

if (movieList.filter((movie) => movie.isWatched).length !== 0) {
  renderElement(headerNode, new ProfileView(movieList), RenderPosition.BEFOREEND);
}

const createNavigation = () => {
  renderElement(mainNode, new MainNavView(movieList), RenderPosition.AFTERBEGIN);
};

const createSortList = () => {
  renderElement(mainNode, new SortListView(), RenderPosition.BEFOREEND);
};

const createMoviesSection = () => {
  renderElement(mainNode, moviesSectionComponent, RenderPosition.BEFOREEND);
};

const createMoviesList = () => {
  renderElement(moviesSectionComponent, moviesListComponent, RenderPosition.BEFOREEND);
};

const createFooterStats = () => {
  renderElement(footerStatisticsNode, new FooterStatsView(movieList.length), RenderPosition.AFTERBEGIN);
};

const createMainBlocksMovies = () => {
  if (movieList.length !== 0) {
    renderElement(moviesListComponent, new MoviesListTitleView(), RenderPosition.AFTERBEGIN);
    renderElement(moviesListComponent, moviesContainerComponent, RenderPosition.BEFOREEND);

    //Отрисовка фильмов
    for (let i = 0; i <= Math.min(movieList.length, MOVIES_COUNT_START); i++) {
      renderMovieCard(moviesContainerComponent.element, movieList[i]);
    }

    //Отрисовка кнопки Показать Больше
    if (movieList.length > MOVIES_COUNT_PER_STEP) {
      const buttonShowMoreComponent = new ShowMoreButtonView();
      let renderMovieCount = MOVIES_COUNT_PER_STEP;

      renderElement(moviesListComponent, buttonShowMoreComponent, RenderPosition.BEFOREEND);

      buttonShowMoreComponent.setClickLoadMoreHandler(() => {
        movieList
          .slice(renderMovieCount, renderMovieCount + MOVIES_COUNT_PER_STEP)
          .forEach((movie) => renderMovieCard(moviesContainerComponent.element, movie));

        renderMovieCount += MOVIES_COUNT_PER_STEP;

        if (renderMovieCount >= movieList.length) {
          remove(buttonShowMoreComponent);
        }
      });
    }
  } else {
    renderElement(moviesListComponent, new MoviesListEmptyTitle(), RenderPosition.AFTERBEGIN);
  }
};

const initApp = () => {
  createNavigation();
  createSortList();
  createMoviesSection();
  createMoviesList();
  createFooterStats();
  createMainBlocksMovies();
};

initApp();
