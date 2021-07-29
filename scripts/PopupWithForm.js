import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #formValues;
  #inputList;
  #popup;
  #form;

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    this.#handleFormSubmit = handleFormSubmit;
    this.#form = this.#popup.querySelector('.form');
  }

  #getInputValues() {
    this.#inputList = this.#popup.querySelectorAll('.form__input');
    this.#formValues = {};
    this.#inputList.forEach((input) => {
      this.#formValues[input.name] = input.value;
    });
    return this.#formValues;
  }

  setEventListeners() {
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleFormSubmit(this.#getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this.#form.reset();
  }
}