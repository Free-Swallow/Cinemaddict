import {createElement} from '../util/render';

const createMoviesListTitleTemplate = () => (
  `<h2 class="films-list__title visually-hidden">
    All movies. Upcoming</h2>`
);

class MoviesListTitleView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMoviesListTitleTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default MoviesListTitleView;
