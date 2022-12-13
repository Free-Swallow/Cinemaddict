import {createElement} from '../util/render';

const createMoviesSectionTemplate = () => (
  `<section class="films-list">
  </section>`
);

class MoviesListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMoviesSectionTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default MoviesListView;
