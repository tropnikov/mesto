// import { nameInput, bioInput } from '../utils/constants.js';

export default class Api {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  #handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  };

  getInitialCards() {
    return fetch(this.#baseUrl + '/cards', {
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  getUserData() {
    return fetch(this.#baseUrl + '/users/me', {
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  saveUserData(inputData) {
    return fetch(this.#baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.bio,
      }),
    }).then(this.#handleResponse);
  }

  addNewCard(cardData) {
    return fetch(this.#baseUrl + '/cards', {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(this.#handleResponse);
  }

  deleteCard(cardId) {
    return fetch(this.#baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  likeCard(cardId) {
    return fetch(this.#baseUrl + `/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  dislikeCard(cardId) {
    return fetch(this.#baseUrl + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  updateAvatar(inputLink) {
    console.log(inputLink);
    return fetch(this.#baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(inputLink),
    }).then(this.#handleResponse);
  }
}
