import AbstractView from './abstract-view.js';

const createMoviesContainerTemplate = () => (
  `<div class="films-list__container">
  </div>`
);

class MoviesContainerView extends AbstractView {
  get template() {
    return createMoviesContainerTemplate();
  }
}

export default MoviesContainerView;
