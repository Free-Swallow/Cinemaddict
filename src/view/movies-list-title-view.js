import AbstractView from './abstract-view.js';

const createMoviesListTitleTemplate = () => (
  `<h2 class="films-list__title visually-hidden">
    All movies. Upcoming</h2>`
);

class MoviesListTitleView extends AbstractView {
  get template() {
    return createMoviesListTitleTemplate();
  }
}

export default MoviesListTitleView;
