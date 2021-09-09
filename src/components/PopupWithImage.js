import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  #fullPhotoImage;
  #fullPhotoCaption;

  constructor(popupSelector) {
    super(popupSelector);
    this.#fullPhotoImage = this._popup.querySelector(
      '.place-full-photo__image'
    );
    this.#fullPhotoCaption = this._popup.querySelector(
      '.place-full-photo__caption'
    );
  }

  open(name, link) {
    this.#fullPhotoImage.src = link;
    this.#fullPhotoImage.alt = name;
    this.#fullPhotoCaption.textContent = name;
    super.open();
  }
}
