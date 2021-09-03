export default class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;
  #inputList;
  #button;

  constructor(config, formElement) {
    this.#formSelector = config.formSelector;
    this.#inputSelector = config.inputSelector;
    this.#submitButtonSelector = config.submitButtonSelector;
    this.#inactiveButtonClass = config.inactiveButtonClass;
    this.#inputErrorClass = config.inputErrorClass;
    this.#errorClass = config.errorClass;
    this.#formElement = formElement;
    this.#inputList = Array.from(
      this.#formElement.querySelectorAll(this.#inputSelector)
    );
    this.#button = this.#formElement.querySelector(this.#submitButtonSelector);
  }

  #checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  };

  #showInputError = (inputElement, errorMessage) => {
    const errorElement = this.#formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#errorClass);
  };

  #hideInputError = (inputElement) => {
    const errorElement = this.#formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = '';
  };

  hideError = () => {
    this.#inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
      this.#toggleButtonState();
    });
  };

  #setFormEventListeners = () => {
    this.#toggleButtonState();
    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
  };

  #toggleButtonState = () => {
    if (this.#hasInvalidInput()) {
      this.#button.classList.add(this.#inactiveButtonClass);
      this.#button.setAttribute('disabled', true);
    } else {
      this.#button.classList.remove(this.#inactiveButtonClass);
      this.#button.removeAttribute('disabled');
    }
  };

  #hasInvalidInput = () => {
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  enableValidation = () => {
    this.#formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#toggleButtonState();
    });
    this.#setFormEventListeners();
  };
}
