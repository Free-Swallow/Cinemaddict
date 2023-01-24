import BoardPresenter from './presenter/board-presenter.js';
import {createMovieList, createCommentList} from './mock/mock.js';

const bodyNode = document.querySelector('body');
const movieList = createMovieList();
const commentList = createCommentList();
const presenter = new BoardPresenter(bodyNode);

presenter.init(movieList, commentList);
