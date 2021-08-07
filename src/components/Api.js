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
      headers: {
        authorization: '3936a02f-bc3d-48a7-bceb-bcb201e7df53',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.bio,
      }),
    }).then(this.#handleResponse);
  }

  addNewCard(cardData) {
    return fetch(this.#baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: '3936a02f-bc3d-48a7-bceb-bcb201e7df53',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(this.#handleResponse);
  }

  deleteCard(cardId) {
    return fetch(this.#baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '3936a02f-bc3d-48a7-bceb-bcb201e7df53',
        'Content-Type': 'application/json',
      },
    }).then(this.#handleResponse);
  }

  // другие методы работы с API
}
