import {
  openPopup,
  fullPhotoCaption,
  fullPhotoImage,
  popupPlacePhotoFull,
} from './index.js';

export class Card {
  #name;
  #link;
  #templateSelector;
  #card;
  #deleteButton;
  #likeButton;
  #placePhoto;

  constructor(data, templateSelector) {
    this.#name = data.name;
    this.#link = data.link;
    this.#templateSelector = templateSelector;
  }

  #getTemplate = () => {
    const cardElement = document
      .querySelector(this.#templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return cardElement;
  };

  createCard = () => {
    this.#card = this.#getTemplate();
    this.#placePhoto = this.#card.querySelector('.place__photo');
    this.#placePhoto.src = this.#link;
    this.#placePhoto.alt = this.#name;
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
    this.#placePhoto.addEventListener('click', () => {
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
