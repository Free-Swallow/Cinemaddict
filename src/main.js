import BoardPresenter from './presenter/board-presenter.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import MoviesService from './services/movies-service';
import CommentsService from './services/comments-service';

const mainNode = document.querySelector('.main');
const bodyNode = document.querySelector('body');

const AUTHORIZATION = 'Basic ssdf83JD3r42J';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const apiMovies = new MoviesService(END_POINT, AUTHORIZATION);
const apiComment = new CommentsService(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel(apiMovies);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(mainNode, filterModel, moviesModel);
const boardPresenter = new BoardPresenter(bodyNode, moviesModel, filterModel, apiComment);

filterPresenter.init();
boardPresenter.init();
moviesModel.init();
