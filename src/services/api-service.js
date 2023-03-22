import {renderToast} from '../util/toast.js';
import {Method} from '../util/const.js';

class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  _load ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this.#authorization);

    return fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers})
      .then(ApiService.checkStatus)
      .catch(ApiService.catchErr);
  }

  static checkStatus(response) {
    if (!response.ok) {
      renderToast(`${response.status}: ${response.statusText}`);
      throw  new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchErr(err) {
    renderToast(`${err}`);
    throw err;
  }

  static parseResponse(response) {
    return response.json();
  }
}

export default ApiService;
