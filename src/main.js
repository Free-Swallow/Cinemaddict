import {createProfileTemplate} from './view/profile';
import {createMainNavTemplate} from './view/main-nav';
import {createSortListTemplate} from './view/sort-list';
import {createFilmsSectionTemplate} from './view/films-section';
import {createFilmsListTitleTemplate} from './view/films-list-title';
import {createFilmsContainerTemplate} from './view/films-container';
import {createFilmCardTemplate} from './view/film-card';
import {createShowMoreButton} from './view/show-more-button';
import {createFilmsListExtra} from './view/films-list-extra';
import {createFilmsListTitleExtra} from './view/films-list-title-extra';
import {createFooterStats} from './view/footer-stats';
import {renderTemplate, RenderPosition} from './render';

const siteHeaderNode = document.querySelector('.header');
const siteMainNode = document.querySelector('.main');
const footerStatisticsNode = document.querySelector('.footer__statistics');

renderTemplate(siteHeaderNode, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainNode, createMainNavTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainNode, createSortListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainNode, createFilmsSectionTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footerStatisticsNode, createFooterStats(), RenderPosition.AFTERBEGIN);

const filmsSectionNode = siteMainNode.querySelector('.films');
const filmsListNode = filmsSectionNode.querySelector('.films-list');

renderTemplate(filmsListNode, createFilmsListTitleTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(filmsListNode, createFilmsContainerTemplate(), RenderPosition.BEFOREEND);

const filmsCardListNode = filmsListNode.querySelector('.films-list__container');

for (let i = 0; i <= 4; i++) {
  renderTemplate(filmsCardListNode, createFilmCardTemplate(), RenderPosition.AFTERBEGIN);
}

renderTemplate(filmsListNode, createShowMoreButton(), RenderPosition.BEFOREEND);

for (let i = 0; i <= 1; i++) {
  renderTemplate(filmsSectionNode, createFilmsListExtra(), RenderPosition.BEFOREEND);
}

const extraListNode = filmsSectionNode.querySelectorAll('.films-list--extra');

extraListNode.forEach((item) => renderTemplate(item, createFilmsListTitleExtra(), RenderPosition.AFTERBEGIN)
);

extraListNode.forEach((item) => renderTemplate(item, createFilmsContainerTemplate(), RenderPosition.BEFOREEND)
);

const filmsCardListExtraFirstNode = extraListNode[0].querySelector('.films-list__container');
const filmsCardListExtraSecondNode = extraListNode[1].querySelector('.films-list__container');

for (let i = 0; i <= 1; i++) {
  renderTemplate(filmsCardListExtraFirstNode, createFilmCardTemplate(), RenderPosition.AFTERBEGIN);
}

for (let i = 0; i <= 1; i++) {
  renderTemplate(filmsCardListExtraSecondNode, createFilmCardTemplate(), RenderPosition.AFTERBEGIN);
}
