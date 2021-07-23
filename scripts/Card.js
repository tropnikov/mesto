import {
  openPopup,
  fullPhotoCaption,
  fullPhotoImage,
  popupPlacePhotoFull,
} from './index.js';

export class Card {
  #name;
  #link;
  #template;
  #card;
  #deleteButton;
  #likeButton;

  constructor(data, templateSelector) {
    this.#name = data.name;
    this.#link = data.link;
    this.#template = document.querySelector(templateSelector).content;
  }

  #getTemplate = () => {
    return this.#template.cloneNode(true).children[0];
  };

  createCard = () => {
    this.#card = this.#getTemplate();
    this.#card.querySelector('.place__photo').src = this.#link;
    this.#card.querySelector('.place__photo').alt = this.#name;
    this.#card.querySelector('.place__title').innerText = this.#name;
    this.#deleteButton = this.#card.querySelector('.place__delete');
    this.#likeButton = this.#card.querySelector('.place__like');
    this.#setEventListeners();
    return this.#card;
  };

  #setEventListeners = () => {
    this.#deleteButton.addEventListener('click', () => {
      this.#deleteCard();
    });
    this.#likeButton.addEventListener('click', () => {
      this.#likeCard();
    });
    this.#card.querySelector('.place__photo').addEventListener('click', () => {
      this.#openFullCard();
    });
  };

  #deleteCard = () => {
    this.#card.remove();
  };

  #likeCard = () => {
    this.#likeButton.classList.toggle('place__like_active');
  };

  #openFullCard = () => {
    openPopup(popupPlacePhotoFull);
    fullPhotoImage.src = this.#link;
    fullPhotoImage.alt = this.#name;
    fullPhotoCaption.textContent = this.#name;
  };
}
