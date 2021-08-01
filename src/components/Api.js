// import { nameInput, bioInput } from '../utils/constants.js';

export default class Api {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.#baseUrl + '/cards', {
      headers: this.#headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  getUserData() {
    return fetch(this.#baseUrl + '/users/me', {
      headers: this.#headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  saveUserData(inputData) {
    fetch(this.#baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '3936a02f-bc3d-48a7-bceb-bcb201e7df53',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.bio,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  addNewCard(cardData) {
    fetch(this.#baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: '3936a02f-bc3d-48a7-bceb-bcb201e7df53',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        // return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  // другие методы работы с API
}
