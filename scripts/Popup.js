export default class Popup {
  #popup;

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  open = () => {
    this.#popup.classList.add('.popup_opened');
  };

  close = () => {
    this.#popup.classList.remove('.popup_opened');
  };

  #handleEscClose = () => {};

  setEventListeners = () => {};
}
