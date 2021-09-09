import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  #handleFormSubmit;
  #form;
  #submitButton;

  constructor(popupSelector) {
    super(popupSelector);
    this.#form = this._popup.querySelector('.form');
    this.#submitButton = this._popup.querySelector('.button_type_save');
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
