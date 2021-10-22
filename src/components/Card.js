// import { myUserId } from '../pages/index.js';
export default class Card {
  #name;
  #link;
  #templateSelector;
  #card;
  #deleteButton;
  #likeButton;
  #placePhoto;
  #handleCardClick;
  #owner;
  #handleCardDelete;
  #cardId;
  #handleCardLike;
  #liked;
  #data;
  #myUserId;
  #likes;

  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
    myUserId,
  }) {
    this.#name = data.name;
    this.#link = data.link;
    this.#owner = data.owner._id;
    this.#cardId = data._id;
    // this.#likes = data.likes;
    // this.#likesCount = data.likes.length;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleCardDelete = handleCardDelete;
    this.#handleCardLike = handleCardLike;
    this.#data = data;
    this.#myUserId = myUserId;
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
    return this.#liked;
  }

  setLike(data) {
    this.#card.querySelector('.place__likes-count').textContent =
      data.likes.length;
    this.#liked = data.likes.some((element) => {
      return element._id === this.#myUserId;
    });
    if (this.#liked) {
      this.#likeButton.classList.add('place__like_active');
    } else {
      this.#likeButton.classList.remove('place__like_active');
    }
  }

  createCard() {
    this.#card = this.#getTemplate();
    this.#placePhoto = this.#card.querySelector('.place__photo');
    this.#placePhoto.src = this.#link;
    this.#placePhoto.alt = this.#name;
    this.#card.querySelector('.place__title').innerText = this.#name;
    this.#deleteButton = this.#card.querySelector('.place__delete');
    this.#likeButton = this.#card.querySelector('.place__like');
    this.setLike(this.#data);
    if (this.#owner === this.#myUserId) {
      this.#deleteButton.classList.remove('place__delete_inactive');
    }
    this.#setEventListeners();
    return this.#card;
  }

  #setEventListeners() {
    this.#deleteButton.addEventListener('click', () => {
      this.#handleCardDelete(this);
    });
    this.#likeButton.addEventListener('click', () => {
      this.#handleCardLike(this);
    });
    this.#placePhoto.addEventListener('click', () => {
      this.#handleCardClick(this.#name, this.#link);
    });
  }

  deleteCard() {
    this.#card.remove();
  }
}
