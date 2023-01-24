import MoviesSectionView from '../view/movies-section-view.js';
import MoviesListView from '../view/movies-list-view.js';
import MoviesContainerView from '../view/movies-container-view.js';
import {
  remove,
  renderElement,
  RenderPosition
} from '../util/render.js';
import MainNavView from '../view/main-nav-view.js';
import ProfileView from '../view/profile-view.js';
import SortListView from '../view/sort-list-view.js';
import FooterStatsView from '../view/footer-stats-view.js';
import MoviesListTitleView from '../view/movies-list-title-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import MoviesListEmptyTitle from '../view/movies-list-empty-title.js';
import ExtraListView from '../view/extra-list-view.js';
import MoviePresenter from './movie-presenter.js';
import {updateItem, sortByDate, sortByRating} from '../util/util';
import {SortType} from '../util/const';

const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_COUNT_START = 4;

const EXTRA_LIST = [
  'Top rated',
  'Most commented',
];

const sortExtraMovies = {
  'Top rated': (movies) => movies.slice().sort((a, b) => b.rating - a.rating).slice(0, 2),
  'Most commented': (movies) => movies.slice().sort((a, b) => b.comments - a.comments).slice(0, 2),
};

class BoardPresenter {
  #boardContainer = null;
  #moviesList = null;
  #commentList = null;
  #headerNode = null;
  #mainNode = null;
  #footerNode = null;
  #footerStatisticsNode = null;
  #moviePresenter = new Map();
  #renderMovieCount = MOVIES_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardMovies = [];

  #moviesSectionComponent = new MoviesSectionView();
  #moviesListComponent = new MoviesListView();
  #moviesContainerComponent = new MoviesContainerView();
  #sortListComponent = new SortListView();
  #moviesListTitleComponent = new MoviesListTitleView();
  #buttonShowMoreComponent = new ShowMoreButtonView();

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
    this.#headerNode = this.#boardContainer.querySelector('.header');
    this.#mainNode = this.#boardContainer.querySelector('.main');
    this.#footerNode = this.#boardContainer.querySelector('.footer');
    this.#footerStatisticsNode = this.#boardContainer.querySelector('.footer__statistics');
  }

  init = (moviesList, commentsList) => {
    this.#moviesList = [...moviesList];
    this.#sourcedBoardMovies = [...moviesList];
    this.#commentList = [...commentsList];

    this.#renderProfile();
    this.#renderNavigation();
    this.#renderBoard();
  }

  #handleMovieChange = (updateMovie) => {
    this.#moviesList = updateItem(this.#moviesList, updateMovie);
    this.#sourcedBoardMovies = updateItem(this.#sourcedBoardMovies, updateMovie);
    this.#moviePresenter.get(updateMovie.id).init(updateMovie);
  };

  #renderMovieCard = (container, movie) => {
    const moviePresenter = new MoviePresenter(container, this.#handleMovieChange);
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  };

  // #renderPopup = (movie) => {
  //
  //   if (this.#popupComponent !== null) {
  //     return;
  //   }
  //
  //   this.#popupComponent = new PopupView(movie);
  //   const movieCommentsList = findComments(this.#commentList, movie.comments);
  //
  //   this.#boardContainer.classList.add(CLASS_OVERFLOW_HIDDEN);
  //
  //   renderElement(this.#boardContainer, this.#popupComponent, RenderPosition.BEFOREEND);
  //
  //   const popupCloseButtonNode = this.#popupComponent.element.querySelector('.film-details__close-btn');
  //   const emojiContainer = this.#popupComponent.element.querySelector('.film-details__new-comment');
  //
  //   renderElement(emojiContainer, new EmojiListView(), RenderPosition.BEFOREEND);
  //
  //   if (movie.comments.length !== EMPTY_COMMENTS_LIST) {
  //     renderElement(emojiContainer, new CommentsListView(movieCommentsList), RenderPosition.BEFOREBEGIN);
  //   }
  //
  //   const popupClickCloseHandler = () => closePopup();
  //
  //   const popupKeydownCloseHandler = (evt) => {
  //     if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
  //       evt.preventDefault();
  //       closePopup();
  //     }
  //   };
  //
  //   const closePopup = () => {
  //     this.#popupComponent.element.remove();
  //     this.#popupComponent = null;
  //     this.#boardContainer.classList.remove(CLASS_OVERFLOW_HIDDEN);
  //     popupCloseButtonNode.removeEventListener('click', popupClickCloseHandler);
  //     document.removeEventListener('keydown', popupKeydownCloseHandler);
  //   };
  //
  //   this.#popupComponent.setClickCloseHandler(() => {
  //     popupClickCloseHandler();
  //
  //   });
  //
  //   document.addEventListener('keydown' , popupKeydownCloseHandler);
  // };

  #renderProfile = () => {
    if (this.#moviesList.filter((movie) => movie.isWatched).length !== 0) {
      renderElement(this.#headerNode, new ProfileView(this.#moviesList), RenderPosition.BEFOREEND);
    }
  };

  #renderNavigation = () => {
    renderElement(this.#mainNode, new MainNavView(this.#moviesList), RenderPosition.AFTERBEGIN);
  };

  #sortMovies = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#moviesList.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#moviesList.sort(sortByRating);
        break;
      default:
        this.#moviesList = [...this.#sourcedBoardMovies];
    }

    this.#currentSortType = sortType;
  };

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#renderMovieCount = MOVIES_COUNT_PER_STEP;
    this.#sortMovies(sortType);
    this.#clearMovieList();
    this.#renderMovies();
    this.#renderShowMoreButton();
  };

  #renderSortList = () => {
    renderElement(this.#mainNode, this.#sortListComponent, RenderPosition.BEFOREEND);
    this.#sortListComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  };

  #renderMoviesSection = () => {
    renderElement(this.#mainNode, this.#moviesSectionComponent, RenderPosition.BEFOREEND);
  };

  #renderMoviesList = () => {
    renderElement(this.#moviesSectionComponent, this.#moviesListComponent, RenderPosition.BEFOREEND);
  };

  #clearMovieList = () => {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#renderMovieCount = MOVIES_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  };

  #renderFooterStats = () => {
    renderElement(this.#footerStatisticsNode, new FooterStatsView(this.#moviesList.length), RenderPosition.AFTERBEGIN);
  };

  #renderShowMoreButton = () => {
    if (this.#moviesList.length > MOVIES_COUNT_PER_STEP) {

      renderElement(this.#moviesListComponent, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);

      this.#buttonShowMoreComponent.setClickLoadMoreHandler(() => {
        this.#moviesList
          .slice(this.#renderMovieCount, this.#renderMovieCount + MOVIES_COUNT_PER_STEP)
          .forEach((movie) => this.#renderMovieCard(this.#moviesContainerComponent.element, movie));

        this.#renderMovieCount += MOVIES_COUNT_PER_STEP;

        if (this.#renderMovieCount >= this.#moviesList.length) {
          remove(this.#buttonShowMoreComponent);
        }
      });
    }
  };

  #renderMovies = () => {
    for (let i = 0; i <= Math.min(this.#moviesList.length, MOVIES_COUNT_START); i++) {
      this.#renderMovieCard(this.#moviesContainerComponent.element, this.#moviesList[i]);
    }
  };

  #renderMoviesContainer = () => {
    renderElement(this.#moviesListComponent, this.#moviesContainerComponent, RenderPosition.BEFOREEND);
  };

  #renderEmptyTitle = () => {
    renderElement(this.#moviesListComponent, new MoviesListEmptyTitle(), RenderPosition.AFTERBEGIN);
  };

  #renderMoviesListTitle = () => {
    renderElement(this.#moviesListComponent, this.#moviesListTitleComponent, RenderPosition.AFTERBEGIN);
  };

  #renderExtraList = () => {
    for (const item of EXTRA_LIST) {
      const typeExtra = item.split(' ').pop();
      const extraBlock = new ExtraListView(item);

      renderElement(this.#moviesSectionComponent, extraBlock, RenderPosition.BEFOREEND);

      const extraContainer = this.#boardContainer.querySelector(`.extra__${typeExtra}`);

      sortExtraMovies[item](this.#moviesList).forEach((movie) =>
        this.#renderMovieCard(extraContainer, movie));
    }
  };

  #renderMainBlocksMovies = () => {
    if (this.#moviesList.length !== 0) {
      this.#renderMoviesListTitle();
      this.#renderMoviesContainer();
      this.#renderMovies();
      this.#renderShowMoreButton();
      // this.#renderExtraList();

    } else {
      this.#renderEmptyTitle();
    }
  };

  #renderBoard = () => {
    this.#renderSortList();
    this.#renderMoviesSection();
    this.#renderMoviesList();
    this.#renderFooterStats();
    this.#renderMainBlocksMovies();
  }
}

export default BoardPresenter;
