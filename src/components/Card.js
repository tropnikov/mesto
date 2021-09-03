import { myUserId } from '../pages/index.js';
export default class Card {
  #name;
  #link;
  #templateSelector;
  #card;
  #deleteButton;
  #likeButton;
  #placePhoto;
  #handleCardClick;
  #likesCount;
  #owner;
  #handleCardDelete;
  #cardId;
  #likes;
  #handleCardLike;

  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
  }) {
    this.#name = data.name;
    this.#link = data.link;
    this.#owner = data.owner._id;
    this.#cardId = data._id;
    this.#likes = data.likes;
    this.#likesCount = data.likes.length;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleCardDelete = handleCardDelete;
    this.#handleCardLike = handleCardLike;
  }

  getCardId() {
    return this.#cardId;
  }

  #getTemplate() {
    const cardElement = document
      .querySelector(this.#templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

  isLiked() {
    // console.log('1');
    console.log(this.#likes);
    return this.#likes.some((element) => {
      // debugger;
      return element._id === myUserId;
    });
  }

  setLike() {}

  createCard() {
    this.#card = this.#getTemplate();
    this.#placePhoto = this.#card.querySelector('.place__photo');
    this.#placePhoto.src = this.#link;
    this.#placePhoto.alt = this.#name;
    this.#card.querySelector('.place__title').innerText = this.#name;
    this.#deleteButton = this.#card.querySelector('.place__delete');
    this.#likeButton = this.#card.querySelector('.place__like');
    this.#card.querySelector('.place__likes-count').textContent =
      this.#likesCount;
    if (this.#owner === myUserId) {
      this.#deleteButton.classList.remove('place__delete_active');
    }
    this.#likes.some((element) => {
      if (element._id === myUserId) {
        this.#likeCard();
      }
    });
    this.#setEventListeners();
    return this.#card;
  }

  #setEventListeners() {
    this.#deleteButton.addEventListener('click', () => {
      this.#handleCardDelete(this);
    });
    this.#likeButton.addEventListener('click', () => {
      this.#handleCardLike(this);
      this.#likeCard();
    });
    this.#placePhoto.addEventListener('click', () => {
      this.#handleCardClick(this.#name, this.#link);
    });
  }

  deleteCard() {
    this.#card.remove();
  }

  #likeCard() {
    this.#likeButton.classList.toggle('place__like_active');
  }
}
