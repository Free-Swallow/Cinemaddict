import {createElement} from '../util/render.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

class AbstractView {
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template.');
  }

  removeElement() {
    this.#element = null;
  }

  shake(callback) {
    this.element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.element.style.animation = '';
      if (callback !== undefined) {
        callback();
      }
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeInnerItem(element) {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = '';
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

export default AbstractView;
