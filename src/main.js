import BoardPresenter from './presenter/board-presenter.js';
import {createMovieList, createCommentList} from './mock/mock.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import CommentsModel from './model/comments-model';

const mainNode = document.querySelector('.main');

const bodyNode = document.querySelector('body');
const movieList = createMovieList();
const commentList = createCommentList();

const moviesModel = new MoviesModel();
const commentModel = new CommentsModel();
moviesModel.movies = movieList;
commentModel.comments = commentList;

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(mainNode, filterModel, moviesModel);
const presenter = new BoardPresenter(bodyNode, moviesModel, filterModel, commentModel);

filterPresenter.init();
presenter.init(commentList);

