import {getRandomPositiveFloat, getRandomInteger} from '../util/util.js';
import dayjs from 'dayjs';

// Данные для карточки фильма

const getMovieTitle = () => {
  const movieNameList = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
  ];

  return movieNameList[getRandomPositiveFloat(0, movieNameList.length - 1)];
};

const getMovieRating = () => getRandomPositiveFloat(0, 10, 1);

const getMovieYear = () => getRandomPositiveFloat(1890, 2022);

const getMovieRuntime = () => getRandomPositiveFloat(10, 200);

const getMovieGenre = () => {
  const movieGenreList = [
    'Cartoon',
    'Comedy',
    'Drama',
    'Western',
    'Musical',
    'Horror',
  ];

  return movieGenreList[getRandomPositiveFloat(0, movieGenreList.length - 1)];
};

const getMovieDescription = () => {
  const movieDescriptionList = [
    'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr',
    'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant\'s narrow escap…',
    'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
    'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
    'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion\'s other assistant. Flamarion falls in love with Connie, the movie\'s femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.',
  ];

  return movieDescriptionList[getRandomPositiveFloat(0, movieDescriptionList.length - 1)];
};

const getMoviePoster = () => {
  const urlMoviePosterList = [
    '/images/posters/made-for-each-other.png',
    '/images/posters/popeye-meets-sinbad.png',
    '/images/posters/sagebrush-trail.jpg',
    '/images/posters/santa-claus-conquers-the-martians.jpg',
    '/images/posters/the-dance-of-life.jpg',
    '/images/posters/the-great-flamarion.jpg',
    '/images/posters/the-man-with-the-golden-arm.jpg',
  ];

  return urlMoviePosterList[getRandomPositiveFloat(0, urlMoviePosterList.length - 1)];
};

const getDirector = () => {
  const directorList = [
    'Christopher Nolan',
    'Steven Spielberg',
    'Quentin Tarantino',
    'Martin Scorsese',
    'David Fincher',
    'Ridley Scott',
    'Stanley Kubrick',
    'Robert Zemeckis',
    'Francis Ford Coppola',
    'Clint Eastwood',
  ];

  return directorList[getRandomPositiveFloat(0, directorList.length - 1)];
};

const getWriters = () => {
  const writersList = [
    'Billy Wilder',
    'Ethan Coen and Joel Coen',
    'Robert Towne',
    'Quentin Tarantino',
    'Francis Ford Coppola',
    'William Goldman',
    'Charlie Kaufman',
    'Woody Allen',
    'Nora Ephron',
    'Ernest Lehman',
  ];

  return writersList[getRandomPositiveFloat(0, writersList.length - 1)];
};

const getActors = () => {
  const actorsList = [
    'Johnny Depp',
    'Al Pacino',
    'Robert De Niro',
    'Kevin Spacey',
    'Denzel Hayes Washington',
    'Russell Crowe',
    'Brad Pitt',
    'Angelina Jolie',
    'Leonardo DiCaprio',
    'Tom Cruise',
  ];

  return actorsList[getRandomPositiveFloat(0, actorsList.length - 1)];
};

const getCountry = () => {
  const countryList = [
    'Switzerland',
    'Germany',
    'Canada',
    'United States',
    'Sweden',
    'Japan',
    'Australia',
    'United Kingdom',
    'France',
    'Denmark',
  ];

  return countryList[getRandomPositiveFloat(0, countryList.length - 1)];
};

const getCommentsId = () => {
  let idCount = 1;

  return function () {
    const idList = [];

    if (idCount === 191) {
      return [];
    }

    for (let i = 1; i <= 10; i++ ) {
      idList.push(idCount);
      idCount++;
    }

    return idList;
  };
};

const idCommentList = getCommentsId();

// Данные для комментариев

const getMessage = () => {
  const messagesList = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  return messagesList[getRandomPositiveFloat(0, messagesList.length - 1)];
};

const getCommentAuthor = () => {
  const commentAuthorList = [
    'John Doe',
    'John Doe',
    'Tim Macoveev',
  ];

  return commentAuthorList[getRandomPositiveFloat(0, commentAuthorList.length - 1)];
};

const getCommentDate = () => {
  const maxDaysGap = -100;
  const daysGap = getRandomInteger(maxDaysGap, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const getSmile = () => {
  const smileList = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  return smileList[getRandomPositiveFloat(0, smileList.length - 1)];
};

const createMovie = () => {
  let movieId = 1;

  return function () {
    const movie = {
      id: movieId,
      title: getMovieTitle(),
      titleOriginal: getMovieTitle(),
      poster: getMoviePoster(),
      description: getMovieDescription(),
      comments: idCommentList(),
      rating: getMovieRating(),
      genre: Array.from({length: getRandomPositiveFloat(1, 3)}, getMovieGenre),
      year: getMovieYear(),
      runtime: getMovieRuntime(),
      writers: Array.from({length: getRandomPositiveFloat(1, 3)}, getWriters),
      director: Array.from({length: getRandomPositiveFloat(1, 3)}, getDirector),
      actors: Array.from({length: getRandomPositiveFloat(1, 4)}, getActors),
      country: getCountry(),
      ageLimit: getRandomPositiveFloat(6, 21),
      isFavorite: Boolean(Math.floor(getRandomPositiveFloat(0, 1))),
      isWatched: Boolean(Math.floor(getRandomPositiveFloat(0, 1))),
      isWatchList: Boolean(Math.floor(getRandomPositiveFloat(0, 1))),
    };

    movieId++;

    return movie;
  };
};

const createComment = () => {
  let commentId = 1;

  return function () {
    const comment = {
      id: commentId,
      message: getMessage(),
      name: getCommentAuthor(),
      date: getCommentDate(),
      smile: getSmile(),
    };

    commentId++;

    return comment;
  };
};

const getMovie = createMovie();

const getComment = createComment();

const createMovieList = () => Array.from({length: 29}, getMovie);

const createCommentList = () => Array.from({length: 100}, getComment);

export {createMovieList, createCommentList};
