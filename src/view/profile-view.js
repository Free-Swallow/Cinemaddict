import AbstractView from './abstract-view.js';
import {getUserRating} from '../util/util.js';

const createProfileTemplate = (moviesList) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${getUserRating(moviesList)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

class ProfileView extends AbstractView {
  #moviesList = null;

  constructor(moviesList) {
    super();
    this.#moviesList = moviesList;
  }

  get template() {
    return createProfileTemplate(this.#moviesList);
  }
}

export default ProfileView;
