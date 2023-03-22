import AbstractObservable from './abstract-observable.js';
import {UpdateType} from '../util/const';
import {renderToast} from '../util/toast';

class CommentsModel extends AbstractObservable {
  #comments = [];
  #commentsApiService = null;

  constructor(apiService) {
    super();
    this.#commentsApiService = apiService;
  }

  set comments(comments) {
    this.#comments = [...comments];
  }

  get comments() {
    return this.#comments;
  }


  async init(movie) {
    try {
      this.#comments = await this.#commentsApiService.comments(movie);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.PATCH, movie);
  }

  async addComment(actionType, update, movie) {
    try {
      const response = await this.#commentsApiService.addComment(movie, update);

      this.#comments = [...this.#comments, response];
      this._notify(actionType, update);
    } catch(err) {
      renderToast(err);
      throw new Error(err);
    }
  }

  async deleteComment(updateType, update) {
    const index = this.comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Cannot delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update.id);

      this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];
      this._notify(updateType);
    } catch(err) {
      renderToast('Не удалость удалить комментария, попробуйте позже.');
      throw new Error(err);
    }


    this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];

    this._notify(updateType, update);
  }
}

export default CommentsModel;
