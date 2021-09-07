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
