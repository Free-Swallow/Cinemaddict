import {createElement} from '../util/render';

const createMovieListEmptyTitle = () => (
  `
<h2 class="films-list__title">There are no movies in our database</h2>`
);

class MoviesListEmptyTitle {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMovieListEmptyTitle();
  }

  removeElement() {
    this.#element = null;
  }
}

export default MoviesListEmptyTitle;
