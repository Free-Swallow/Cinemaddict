import AbstractObservable from './abstract-observable.js';
import {FilterType} from '../util/const';

class FilterModel extends AbstractObservable {
  #filterType = null;

  constructor() {
    super();
    this.#filterType = FilterType.ALL;
  }

  get filter() {
    return this.#filterType;
  }

  setFilter = (updateType, filter) => {
    this.#filterType = filter;
    this._notify(updateType, filter);
  };
}

export default FilterModel;
