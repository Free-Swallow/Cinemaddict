import {createElement} from '../util/render';

const createFooterStatsTemplate = (list) => (
  `<p>${list} movies inside</p>`
);

class FooterStatsView {
  #element = null;
  #movieCount = null;

  constructor(movieCount) {
    this.#movieCount = movieCount;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatsTemplate(this.#movieCount);
  }

  removeElement() {
    this.#element = null;
  }
}

export default FooterStatsView;
