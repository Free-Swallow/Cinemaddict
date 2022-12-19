import AbstractView from './abstract-view.js';
const createMoviesSectionTemplate = () => (
  `<section class="films-list">
  </section>`
);

class MoviesListView extends AbstractView {
  get template() {
    return createMoviesSectionTemplate();
  }
}

export default MoviesListView;
