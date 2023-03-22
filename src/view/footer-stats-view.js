import AbstractView from './abstract-view.js';

const createFooterStatsTemplate = (count) => (
  `<p>${count} movies inside</p>`
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
