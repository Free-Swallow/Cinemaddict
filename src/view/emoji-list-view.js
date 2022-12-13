import {createElement} from '../util/render.js';

const emojiList = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const createEmojiInput = () => emojiList
  .map((emoji) => (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
            </label>`)
  );

const createEmojiListTemplate = () => (
  `<div class="film-details__emoji-list">
    ${createEmojiInput().join('')}
</div>`
);

class EmojiListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmojiListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default EmojiListView;
