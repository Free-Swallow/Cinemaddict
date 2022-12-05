const movieToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.isWatchList).length,
  history: (movies) => movies.filter((movie) => movie.isWatched).length,
  favorite: (movies) => movies.filter((movie) => movie.isFavorite).length,
};

const generateFilter = (movies) => Object.entries(movieToFilterMap).map(
  ([filterName, countMovies]) => ({
    name: filterName,
    count: countMovies(movies),
  }),
);

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;

  return (`<a href="${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`);
};

const createMainNavTemplate = (movies) => {
  const filter = generateFilter(movies);
  const filterTemplate = filter
    .map((currentFilter) => createFilterItemTemplate(currentFilter));
  const filterList = [
    '<a href="#all" class="main-navigation__item main-navigation__item&#45;&#45;active">All movies</a>',
    ...filterTemplate
  ].join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
        ${filterList}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export {createMainNavTemplate};
