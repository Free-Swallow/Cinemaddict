import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRandomPositiveFloat = (a, b, digits = 0) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const findComments = (commentList, idList) => {
  const comments = [];

  for (let i = 0; i <= idList.length; i++) {
    const comment = commentList.find((com) => com.id === idList[i]);

    if (comment !== undefined) {
      comments.push(comment);
    }
  }

  return comments;
};

const convertTime = (mins) => {
  const time = [];
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  time.push(hours, minutes);

  if (time[0] === 0) {
    return dayjs.duration({minutes: time[1]}).format('m[m]');
  }

  return dayjs.duration({hours: time[0], minutes: time[1]}).format('H[h] m[m]');
};

const convertCommentDate = (date) => dayjs(date).fromNow();

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortByDate = (a, b) => b.year > a.year;
const sortByRating = (a, b) => b.rating > a.rating;

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

const formatDate = (date, format) =>  dayjs(date).format(format);

export {
  getRandomPositiveFloat,
  getRandomInteger,
  findComments,
  convertTime,
  convertCommentDate,
  updateItem,
  sortByDate,
  sortByRating,
  getUserRating,
  formatDate
};
