import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
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

  // #getInputValues() {
  //   this.#formValues = {};
  //   this.#inputList.forEach((input) => {
  //     this.#formValues[input.name] = input.value;
  //   });
  //   return this.#formValues;
  // }

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
