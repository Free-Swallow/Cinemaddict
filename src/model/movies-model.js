import AbstractObservable from './abstract-observable.js';

class MoviesModel extends AbstractObservable {
  #movies = [];

  set movies(movies) {
    this.#movies = [...movies];
  }

  get movies() {
    return this.#movies;
  }

  updateMovie = (updateType, update) => {
    const index = this.#movies.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Cannot update unexisting movie');
    }

    this.#movies = [...this.#movies.slice(0, index), update, ...this.#movies.slice(index + 1)];

    this._notify(updateType, update);
  };
}

export default MoviesModel;
