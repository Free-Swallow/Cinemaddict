import ApiService from './api-service';
import {Method} from '../util/const';
import {adaptToServer} from '../util/api';

class MoviesService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  async UpdateMovie(movie) {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptToServer(movie)),
      headers: new Headers({'Content-type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}

export default MoviesService;
