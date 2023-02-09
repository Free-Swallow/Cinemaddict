import AbstractView from './abstract-view.js';

class SmartView extends AbstractView {
  _data = {};

  updateData = (update, justDataUpdate) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};

    if (justDataUpdate) {
      return;
    }

    this.updateElement();
  };

  updateElement = () => {
    const prevElement = this.element;
    const scrollPosition = prevElement.scrollTop;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = scrollPosition;

    this.restoreHandlers();
  };

  restoreHandlers = () => {
    throw new Error('Smart method not implemented: restoreHandlers');
  };
}

export default SmartView;
