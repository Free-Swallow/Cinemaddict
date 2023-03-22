import AbstractObservable from './abstract-observable.js';
import {adaptToClient} from '../util/api.js';
import {UpdateType} from '../util/const';
import {renderToast} from '../util/toast';

class MoviesModel extends AbstractObservable {
  #movieApiService = null;
  #movies = [];

  constructor(movieApiService) {
    super();
    this.#movieApiService = movieApiService;
  }

  set movies(movies) {
    this.#movies = [...movies];
  }

  get movies() {
    return this.#movies;
  }

  async init() {
    try {
      const movies = await this.#movieApiService.movies;
      this.#movies = movies.map(adaptToClient);
    } catch (err) {
      this.#movies = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateMovie = async (updateType, update) => {
    const index = this.#movies.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Cannot update unexisting movie');
    }

    try {
      const response = await this.#movieApiService.UpdateMovie(update);
      const updatedMovie = adaptToClient(response);

      this.#movies = [...this.#movies.slice(0, index), updatedMovie, ...this.#movies.slice(index + 1)];
      this._notify(updateType, update);
    } catch(err) {
      renderToast(err);
      throw new Error(err);
    }
  };
}

export default MoviesModel;
