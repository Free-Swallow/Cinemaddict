const adaptToClient = (movie) => {
  const adaptedMovie = {
    id: movie.id,
    title: movie.film_info.title,
    titleOriginal: movie.film_info.alternative_title,
    poster: movie.film_info.poster,
    description: movie.film_info.description,
    comments: movie.comments,
    rating: movie.film_info.total_rating,
    genre: movie.film_info.genre,
    year: movie.film_info.release.date,
    runtime: movie.film_info.duration,
    writers: movie.film_info.writers,
    director: movie.film_info.director,
    actors: movie.film_info.actors,
    country: movie.film_info.release.release_country,
    ageLimit: movie.film_info.age_rating,
    isFavorite: movie.user_details.favorite,
    isWatched: movie.user_details.already_watched,
    isWatchList: movie.user_details.watchlist,
    watchingDate: new Date(movie.user_details.watching_date),
  };

  return adaptedMovie;
};

const adaptToServer = (movie) => {
  const adaptedMovie = {
    id: movie.id,
    comments: movie.comments,
    film_info: {
      title: movie.title,
      alternative_title: movie.titleOriginal,
      poster: movie.poster,
      description: movie.description,
      total_rating: movie.rating,
      genre: movie.genre,
      release: {
        date: movie.year,
        release_country: movie.country
      },
      duration: movie.runtime,
      writers: movie.writers,
      director: movie.director,
      actors: movie.actors,
      age_rating: movie.ageLimit,
    },
    user_details: {
      favorite: movie.isFavorite,
      already_watched: movie.isWatched,
      watchlist: movie.isWatchList,
      watching_date: new Date(movie.watchingDate),
    },
  };

  return adaptedMovie;
};

export {adaptToClient, adaptToServer};
