import ToastView from '../view/toast-view';
import {remove, renderElement, RenderPosition} from './render';

const renderToast = (message, duration = 3000) => {
  const toast = new ToastView(message);
  renderElement(document.querySelector('body'), toast, RenderPosition.BEFOREEND);

  setTimeout(() => {
    remove(toast);
  }, duration);
};

export {renderToast};
