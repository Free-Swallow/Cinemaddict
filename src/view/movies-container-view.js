import {createElement} from '../util/render.js';

const createMoviesContainerTemplate = () => (
  `<div class="films-list__container">
  </div>`
);

class MoviesContainerView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMoviesContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default MoviesContainerView;
