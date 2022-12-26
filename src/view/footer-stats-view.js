import AbstractView from './abstract-view.js';

const createFooterStatsTemplate = (list) => (
  `<p>${list} movies inside</p>`
);

class FooterStatsView extends AbstractView {
  #movieCount = null;

  constructor(movieCount) {
    super();
    this.#movieCount = movieCount;
  }

  get template() {
    return createFooterStatsTemplate(this.#movieCount);
  }
}

export default FooterStatsView;
