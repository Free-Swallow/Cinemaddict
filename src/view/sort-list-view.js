import AbstractView from './abstract-view.js';
import {SortType} from '../util/const.js';

const createSortListTemplate = (sortType) => (
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${sortType === SortType.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${sortType === SortType.DATE ? 'sort__button--active' : ''}">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button ${sortType === SortType.RATING ? 'sort__button--active' : ''}">Sort by rating</a></li>
  </ul>`
);

class SortListView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortListTemplate(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}

export default SortListView;
