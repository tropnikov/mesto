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

  constructor(data, templateSelector, handleCardClick, handleCardDelete) {
    this.#name = data.name;
    this.#link = data.link;
    this.#owner = data.owner._id;
    this.#cardId = data._id;
    if (data.likes.length) {
      this.#likesCount = data.likes.length;
    } else {
      this.#likesCount = 0;
    }
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleCardDelete = handleCardDelete;
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
    // console.log(this.#card);
    // console.log(this.#owner);
    if (this.#owner == myUserId) {
      this.#deleteButton.classList.remove('place__delete_active');
      // console.log(this.#deleteButton);
      // console.log('1');
    }
    this.#setEventListeners();
    return this.#card;
  }

  #setEventListeners() {
    this.#deleteButton.addEventListener('click', () => {
      console.log('1');
      this.#handleCardDelete(this);
      // this.#deleteCard();
    });
    this.#likeButton.addEventListener('click', () => {
      this.#likeCard();
    });
    this.#placePhoto.addEventListener('click', () => {
      this.#handleCardClick(this.#name, this.#link);
    });
  }

  #deleteCard() {
    this.#card.remove();
  }

  #likeCard() {
    this.#likeButton.classList.toggle('place__like_active');
  }
}
