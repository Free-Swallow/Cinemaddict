import ApiService from './api-service';
import {Method} from '../util/const.js';

class CommentsService extends ApiService {

  async comments(movie) {
    return this._load({url: `comments/${movie.id}`})
      .then(ApiService.parseResponse);
  }

  async addComment(movie, comment) {
    const response = await this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    if (response) {
      const parsedResponse = await ApiService.parseResponse(response);
      return parsedResponse;
    }
  }

  async deleteComment(id) {
    return await this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }
}

export default CommentsService;
