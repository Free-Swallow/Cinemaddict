import AbstractView from './abstract-view.js';

const createShowMoreButtonTemplate = () => (
  `<button class="films-list__show-more">
  Show more</button>`
);

class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setClickLoadMoreHandler = (callback) => {
    this._callback.loadMore = callback;
    this.element
      .addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.loadMore();
  }
}

export default ShowMoreButtonView;
