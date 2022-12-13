import {createElement} from '../util/render';

const createMoviesSectionTemplate = () => (
  `<section class="films">
  </section>`
);

class MoviesSectionView {
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

export default MoviesSectionView;
