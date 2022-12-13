import {createElement} from '../util/render';

const createShowMoreButtonTemplate = () => (
  `<button class="films-list__show-more">
  Show more</button>`
);

class ShowMoreButtonView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default ShowMoreButtonView;
