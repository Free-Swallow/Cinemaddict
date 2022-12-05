import './mock/mock';
import {createProfileTemplate} from './view/profile';
import {createMainNavTemplate} from './view/main-nav';
import {createSortListTemplate} from './view/sort-list';
import {createFilmsSectionTemplate} from './view/films-section';
import {createFilmsListTitleTemplate} from './view/films-list-title';
import {createFilmsContainerTemplate} from './view/films-container';
import {createFilmCardTemplate} from './view/film-card';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createFilmsListExtraTemplate} from './view/films-list-extra';
import {createFilmsListTitleExtraTemplate} from './view/films-list-title-extra';
import {createFooterStatsTemplate} from './view/footer-stats';
import {createPopupTemplate} from './view/popup-view';
import {renderTemplate, RenderPosition} from './render';
import {createMovieList, createCommentList} from './mock/mock';

const movieList = createMovieList();
const commentList = createCommentList();

const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_COUNT_START = 4;

const siteHeaderNode = document.querySelector('.header');
const siteMainNode = document.querySelector('.main');
const footerStatisticsNode = document.querySelector('.footer__statistics');

renderTemplate(siteHeaderNode, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainNode, createMainNavTemplate(movieList), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainNode, createSortListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainNode, createFilmsSectionTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footerStatisticsNode, createFooterStatsTemplate(movieList), RenderPosition.AFTERBEGIN);

const filmsSectionNode = siteMainNode.querySelector('.films');
const filmsListNode = filmsSectionNode.querySelector('.films-list');

renderTemplate(filmsListNode, createFilmsListTitleTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(filmsListNode, createFilmsContainerTemplate(), RenderPosition.BEFOREEND);

const filmsCardListNode = filmsListNode.querySelector('.films-list__container');

for (let i = 0; i <= Math.min(movieList.length, MOVIES_COUNT_START); i++) {
  renderTemplate(filmsCardListNode, createFilmCardTemplate(movieList[i]), RenderPosition.BEFOREEND);
}

if (movieList.length > MOVIES_COUNT_PER_STEP) {
  let renderMovieCount = MOVIES_COUNT_PER_STEP;

  renderTemplate(filmsListNode, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const buttonShowMoreNode = filmsListNode.querySelector('.films-list__show-more');

  buttonShowMoreNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    movieList
      .slice(renderMovieCount, renderMovieCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => renderTemplate(filmsCardListNode, createFilmCardTemplate(movie), RenderPosition.BEFOREEND));

    renderMovieCount += MOVIES_COUNT_PER_STEP;

    if (renderMovieCount >= movieList.length) {
      buttonShowMoreNode.remove();
    }
  });
}

for (let i = 0; i <= 1; i++) {
  renderTemplate(filmsSectionNode, createFilmsListExtraTemplate(), RenderPosition.BEFOREEND);
}

const extraListNode = filmsSectionNode.querySelectorAll('.films-list--extra');

extraListNode.forEach((item) => renderTemplate(item, createFilmsListTitleExtraTemplate(), RenderPosition.AFTERBEGIN)
);

extraListNode.forEach((item) => renderTemplate(item, createFilmsContainerTemplate(), RenderPosition.BEFOREEND)
);

const filmsCardListExtraFirstNode = extraListNode[0].querySelector('.films-list__container');
const filmsCardListExtraSecondNode = extraListNode[1].querySelector('.films-list__container');

for (let i = 0; i <= 1; i++) {
  renderTemplate(filmsCardListExtraFirstNode, createFilmCardTemplate(movieList
    .slice()
    .sort((a, b) => b.rating - a.rating)[i]), RenderPosition.BEFOREEND);
}

for (let i = 0; i <= 1; i++) {
  renderTemplate(filmsCardListExtraSecondNode, createFilmCardTemplate(movieList
    .slice()
    .sort((a, b) => b.rating - a.rating)[i]), RenderPosition.BEFOREEND);
}

renderTemplate(document.body, createPopupTemplate(movieList[0], commentList), RenderPosition.BEFOREEND);

const popupNode = document.querySelector('.film-details');
const popupCloseButtonNode = document.querySelector('.film-details__close-btn');

popupCloseButtonNode.addEventListener('click', () => {
  popupNode.remove();
});

