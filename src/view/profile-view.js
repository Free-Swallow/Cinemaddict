import AbstractView from './abstract-view.js';

const UserRating = {
  NOVICE: 10,
  FAN: 20,
  MOVIE_BUFF: 21
};

const isNovice = (data) => data <= UserRating.NOVICE;
const isFan = (data) => data <= UserRating.FAN && data > UserRating.NOVICE;
const isMovieBuff = (data) => data >= UserRating.MOVIE_BUFF;

const getCountHisotry = (data) => data.filter((movie) => movie.isWatched).length;

const getUserRating = (data) => {
  if (isNovice(getCountHisotry(data))) {
    return 'Novice';
  }
  if (isFan(getCountHisotry(data))) {
    return 'Fan';
  }
  if (isMovieBuff(getCountHisotry(data))) {
    return 'Movie Buff';
  }
};

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
