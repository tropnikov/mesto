export default class Popup {
  #popup;

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  open() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  }

  close() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#handleEscClose);
  }

  #handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this.#popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    this.#popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
