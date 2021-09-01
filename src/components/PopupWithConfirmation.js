import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  #handleFormSubmit;
  #formValues;
  #inputList;
  #popup;
  #form;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    // this.#handleFormSubmit = handleFormSubmit;
    this.#form = this.#popup.querySelector('.form');
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
    // this.#form.reset();
  }
}
