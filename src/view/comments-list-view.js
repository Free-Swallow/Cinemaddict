import {convertCommentDate} from '../util';

const createComment = (list) => list.map(({smile, date, message, name}) => (`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${smile}.png" width="55" height="55" alt="emoji-${smile}">
            </span>
            <div>
              <p class="film-details__comment-text">${message}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${name}</span>
                <span class="film-details__comment-day">${convertCommentDate(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`)).join('');

const createCommentsListTemplate = (list) => (
  `<ul class="film-details__comments-list">
    ${createComment(list)}
        </ul>`
);

export {createCommentsListTemplate};

