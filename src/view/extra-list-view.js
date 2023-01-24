import AbstractView from './abstract-view';

const createExtraList = (title) => (`<section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container extra__${title.split(' ').pop()}">
      </div>
    </section>`);

class ExtraListView extends AbstractView {
  #title = null;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createExtraList(this.#title);
  }
}

export default ExtraListView;
