import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

function getRandomPositiveFloat (a, b, digits = 0) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

function getRandomInteger (a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

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

function convertTime (mins) {
  const time = [];
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  time.push(hours, minutes);

  if (time[0] === 0) {
    return dayjs.duration({minutes: time[1]}).format('m[m]');
  }

  return dayjs.duration({hours: time[0], minutes: time[1]}).format('H[h] m[m]');
}

function convertCommentDate (date) {
  return dayjs(date).fromNow();
}

export {getRandomPositiveFloat, getRandomInteger, findComments, convertTime, convertCommentDate};
