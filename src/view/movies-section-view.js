import AbstractView from './abstract-view.js';

const createMoviesSectionTemplate = () => (
  `<section class="films">
    <section class="films-list">
    </section>
  </section>`
);

class MoviesSectionView extends AbstractView {
  get template() {
    return createMoviesSectionTemplate();
  }
}

export default MoviesSectionView;
