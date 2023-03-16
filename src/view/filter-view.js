import AbstractView from './abstract-view.js';
import {FilterType} from '../util/const';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a
      href="#${type}"
      data-value="${type}"
      class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
      ${name}
      ${type !== FilterType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ''}
      </a>`
  );
};

const createFilterTemplate = (filters, currentFilterType) => filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');


const createMainNavTemplate = (filters, currentFilterType) =>(
  `<nav class="main-navigation">
    <div class="main-navigation__items">
        ${createFilterTemplate(filters, currentFilterType)}
    </div>
    <a href="#stats" data-value="${FilterType.STATS}" class="main-navigation__additional ${currentFilterType === FilterType.STATS ? 'main-navigation__additional--active' : ''}">Stats</a>
  </nav>`
);

class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createMainNavTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.value);
  };
}

export default FilterView;
