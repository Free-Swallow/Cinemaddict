import AbstractView from './abstract-view.js';

const createToast = (message) => (`<article class="toast"><p class="toast-message">${message}</p></article>`);

class ToastView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createToast(this.#message);
  }
}

export default ToastView;
