import AbstractView from './abstract-view.js';

const createMovieListEmptyTitle = () => (
  `
<h2 class="films-list__title">There are no movies in our database</h2>`
);

class MoviesListEmptyTitle extends AbstractView {
  get template() {
    return createMovieListEmptyTitle();
  }
}

export default MoviesListEmptyTitle;
