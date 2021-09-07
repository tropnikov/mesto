import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  #handleFormSubmit;
  #formValues;
  #inputList;
  #popup;
  #form;
  #submitButton;

  constructor(popupSelector) {
    super(popupSelector);
    // при записи приватных полей через hash names доступа к приватным полям снаружи класса нет, включая классы-потомки
    // https://stackoverflow.com/questions/55865403/how-to-access-the-super-classs-private-member-in-javascript
    this.#popup = document.querySelector(popupSelector);
    this.#form = this.#popup.querySelector('.form');
    this.#submitButton = this.#popup.querySelector('.button_type_save');
  }

  setFormHandler(handler) {
    this.#handleFormSubmit = handler;
  }

  setEventListeners() {
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleFormSubmit();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.#submitButton.textContent = 'Удаление...';
    } else {
      this.#submitButton.textContent = 'Да';
    }
  }
}
