import MoviesSectionView from '../view/movies-section-view.js';
import MoviesContainerView from '../view/movies-container-view.js';
import {
  remove,
  renderElement,
  RenderPosition
} from '../util/render.js';
import ProfileView from '../view/profile-view.js';
import SortListView from '../view/sort-list-view.js';
import FooterStatsView from '../view/footer-stats-view.js';
import MoviesListTitleView from '../view/movies-list-title-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import MoviesListEmptyTitle from '../view/movies-list-empty-title.js';
import ExtraListView from '../view/extra-list-view.js';
import MoviePresenter from './movie-presenter.js';
import {sortByDate, sortByRating} from '../util/util.js';
import {FilterType, SortType, StatisticTime, UpdateType, UserActions, MOVIES_COUNT_PER_STEP, MOVIES_COUNT_START, EXTRA_LIST, sortExtraMovies} from '../util/const.js';
import {filter} from '../util/filter.js';
import StatisticView from '../view/statistic-view.js';

class BoardPresenter {
  #boardContainer = null;
  #moviesModel = null;
  #commentModel = null;
  #filterModel = null;

  #headerNode = null;
  #mainNode = null;
  #footerNode = null;
  #footerStatisticsNode = null;
  #movieSectionNode = null;
  #filterNode = null;

  #moviePresenter = new Map();
  #renderMovieCount = MOVIES_COUNT_START;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #statisticFilter = StatisticTime.ALL_TIME;

  #moviesSectionComponent = null;
  #moviesContainerComponent = null;
  #sortListComponent = null;
  #moviesListTitleComponent = null;
  #profileComponent = null;
  #buttonShowMoreComponent = null;
  #emptyTitleComponent = null;
  #footerStatsComponent = null;
  #extraBlocks = null;
  #statisticComponent = null;

  constructor(boardContainer, moviesModal, filterModel, commentModel) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModal;
    this.#filterModel = filterModel;
    this.#commentModel = commentModel;

    this.#headerNode = this.#boardContainer.querySelector('.header');
    this.#mainNode = this.#boardContainer.querySelector('.main');
    this.#footerNode = this.#boardContainer.querySelector('.footer');
    this.#footerStatisticsNode = this.#boardContainer.querySelector('.footer__statistics');


    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    this.#filterType = this.#filterModel.filter;
    const movies = this.#moviesModel.movies;

    if (this.#filterType === FilterType.STATS) {
      return this.#moviesModel.movies;
    }

    const filteredMovies = filter[this.#filterType](movies);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortByDate);
      case SortType.RATING:
        return filteredMovies.sort(sortByRating);
    }

    return filteredMovies;
  }

  init = () => {
    this.#renderFooterStats();
    this.#renderMoviesBoard();
  }

  // HANDLER

  #handleViewAction = (actionType, updateType, update, updateComment = {}) => {
    switch (actionType) {
      case UserActions.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
      case UserActions.ADD_COMMENT:
        this.#commentModel.addComment(UpdateType.PATCH, updateComment);
        this.#moviesModel.updateMovie(updateType, update);
        break;
      case UserActions.DELETE_COMMENT:
        this.#commentModel.deleteComment(UpdateType.PATCH, updateComment);
        this.#moviesModel.updateMovie(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviePresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderMovieBlock();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedMovieCount: true, resetSortType: true, resetStatisticFilter: true});

        switch (this.#filterType) {
          case FilterType.STATS:
            this.#renderStatistic();
            break;
          default:
            this.#renderMovieBlock();
            break;
        }
    }
  };

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#renderMovieCount = MOVIES_COUNT_START;
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderMovieBlock({resetRenderedMovieCount: true});
  };

  #handlerChangeStatisticFilter = (filterType) => {
    if (this.#statisticFilter === filterType) {
      return;
    }

    this.#statisticFilter = filterType;
    this.#clearBoard();
    this.#renderStatistic();
  };

  #handlerShowMoreButtonClick = () => {
    const movieCount = this.movies.length;
    const newRenderMovieCount = Math.min(movieCount, this.#renderMovieCount + MOVIES_COUNT_PER_STEP);

    this.movies
      .slice(this.#renderMovieCount + 1, newRenderMovieCount + 1)
      .forEach((movie) => this.#renderMovieCard(this.#moviesContainerComponent.element, movie));
    this.#renderMovieCount = newRenderMovieCount;

    if (this.#renderMovieCount >= movieCount) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  // CLEAR

  #clearMoviesSpace = () => {
    remove(this.#moviesSectionComponent);
    remove(this.#moviesListTitleComponent);
    remove(this.#moviesContainerComponent);
  };

  #clearBoard = ({resetRenderedMovieCount = false, resetSortType = false, resetStatisticFilter = false} = {}) => {
    const movieCount = this.movies.length;

    this.#moviePresenter.forEach((movie) => movie.destroy());
    this.#moviePresenter.clear();

    remove(this.#sortListComponent);
    remove(this.#emptyTitleComponent);
    remove(this.#buttonShowMoreComponent);
    remove(this.#statisticComponent);
    remove(this.#profileComponent);

    this.#clearMoviesSpace();

    if  (resetRenderedMovieCount) {
      this.#renderMovieCount = MOVIES_COUNT_START;
    } else {
      this.#renderMovieCount = Math.min(movieCount, this.#renderMovieCount);
    }

    if  (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (resetStatisticFilter) {
      this.#statisticFilter = StatisticTime.ALL_TIME;
    }
  };

  // RENDER

  #renderStatistic = () => {
    this.#filterNode = this.#boardContainer.querySelector('.main-navigation');

    this.#statisticComponent = new StatisticView(this.movies, this.#statisticFilter);
    this.#statisticComponent.setChangeStatisticFilterHandler(this.#handlerChangeStatisticFilter);

    renderElement(this.#filterNode, this.#statisticComponent, RenderPosition.AFTEREND);
  };

  #renderMovieCard = (container, movie) => {
    const moviePresenter = new MoviePresenter(container, this.#handleViewAction, this.#commentModel);
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  };

  #renderProfile = () => {
    this.#profileComponent = new ProfileView(this.#moviesModel.movies);
    if (this.movies.filter((movie) => movie.isWatched).length !== 0) {
      renderElement(this.#headerNode, this.#profileComponent, RenderPosition.BEFOREEND);
    }
  };

  #renderSortList = () => {
    if (this.#sortListComponent !== null) {
      this.#sortListComponent = null;
    }

    this.#filterNode = this.#boardContainer.querySelector('.main-navigation');
    this.#sortListComponent = new SortListView(this.#currentSortType);
    this.#sortListComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);

    renderElement(this.#filterNode, this.#sortListComponent, RenderPosition.AFTEREND);
  };

  #renderMoviesSection = () => {
    this.#moviesSectionComponent = new MoviesSectionView();
    renderElement(this.#mainNode, this.#moviesSectionComponent, RenderPosition.BEFOREEND);

    this.#movieSectionNode = this.#boardContainer.querySelector('.films-list');
  };

  #renderFooterStats = () => {
    this.#footerStatsComponent = new FooterStatsView(this.movies.length);
    renderElement(this.#footerStatisticsNode, this.#footerStatsComponent, RenderPosition.AFTERBEGIN);
  };

  #renderShowMoreButton = () => {
    this.#buttonShowMoreComponent = new ShowMoreButtonView();
    this.#buttonShowMoreComponent.setClickLoadMoreHandler(this.#handlerShowMoreButtonClick);

    renderElement(this.#movieSectionNode, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);
  };

  #renderMovies = () => {
    for (let i = 0; i <= Math.min(this.movies.length, this.#renderMovieCount); i++) {
      this.#renderMovieCard(this.#moviesContainerComponent.element, this.movies[i]);
    }
  };

  #renderMoviesContainer = () => {
    this.#moviesContainerComponent = new MoviesContainerView();
    renderElement(this.#movieSectionNode, this.#moviesContainerComponent, RenderPosition.BEFOREEND);
  };

  #renderEmptyTitle = () => {
    this.#emptyTitleComponent = new MoviesListEmptyTitle(this.#filterType);
    renderElement(this.#movieSectionNode, this.#emptyTitleComponent, RenderPosition.AFTERBEGIN);
  };

  #renderMoviesListTitle = () => {
    this.#moviesListTitleComponent = new MoviesListTitleView();
    renderElement(this.#movieSectionNode, this.#moviesListTitleComponent, RenderPosition.AFTERBEGIN);
  };

  #renderMovieSpace = () => {
    this.#renderMoviesSection();
    this.#renderMoviesContainer();
  };

  #renderExtraList = () => {
    for (const item of EXTRA_LIST) {
      const typeExtra = item.split(' ').pop();
      this.#extraBlocks = [];
      this.#extraBlocks.push(new ExtraListView(item));
      const extraBlock = new ExtraListView(item);

      renderElement(this.#moviesSectionComponent, extraBlock, RenderPosition.BEFOREEND);

      const extraContainer = this.#boardContainer.querySelector(`.extra__${typeExtra}`);

      sortExtraMovies[item](this.movies).forEach((movie) =>
        this.#renderMovieCard(extraContainer, movie));
    }
  };

  #renderMovieBlock = () => {
    this.#renderMovieSpace();

    if (this.movies.length === 0) {
      this.#renderEmptyTitle();
      return;
    }

    this.#renderProfile();
    this.#renderSortList();
    this.#renderMovies();
    this.#renderShowMoreButton();

  };

  #renderMoviesBoard = () => {
    this.#renderMovieSpace();

    if (this.movies.length === 0) {
      this.#renderEmptyTitle();
    } else {
      this.#renderMoviesListTitle();
      this.#renderProfile();
      this.#renderSortList();
      this.#renderMovies();
      this.#renderShowMoreButton();
      // this.#renderExtraList();
    }
  };
}

export default BoardPresenter;
