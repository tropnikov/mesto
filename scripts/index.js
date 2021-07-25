import { initialCards } from './initial-cards.js';
import { Card } from './Card.js';
import { validationConfig } from './validation-config.js';
import { FormValidator } from './FormValidator.js';

// попап редактирования профиля
const editInfoButton = document.querySelector('.button_type_edit');
const editInfoPopup = document.querySelector('.profile-edit');
const editInfoButtonClose = editInfoPopup.querySelector(
  '.profile-edit__close-button'
);
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const editInfoFormElement = document.querySelector('.profile-edit__form');
const nameInput = editInfoFormElement.querySelector("[name='profile-name']");
const jobInput = editInfoFormElement.querySelector("[name='profile-bio']");

// попап добавления нового места
const addPlaceButton = document.querySelector('.button_type_add');
const addPlacePopup = document.querySelector('.place-add');
const addPlaceButtonClose = document.querySelector('.place-add__close-button');
const addPlaceFormElement = document.querySelector('.place-add__form');
const placeNameInput = addPlaceFormElement.querySelector("[name='place-name']");
const placeLinkInput = addPlaceFormElement.querySelector("[name='place-link']");
const addPlaceInputList = Array.from(
  addPlaceFormElement.querySelectorAll('.form__input')
);
const addPlaceSubmitButton = addPlaceFormElement.querySelector('.form__submit');

// список с карточками
const cardsList = document.querySelector('.places');
const formList = Array.from(document.querySelectorAll('.form'));
// шаблон карточки
const cardTemplate = document.querySelector('.card-template').content;

// попап просмотра фотографии места
const popupPlacePhotoFull = document.querySelector('.place-full-photo');
const fullPhotoImage = popupPlacePhotoFull.querySelector(
  '.place-full-photo__image'
);
const fullPhotoCaption = popupPlacePhotoFull.querySelector(
  '.place-full-photo__caption'
);
const popupPlacePhotoFullButtonClose = document.querySelector(
  '.place-full-photo__close-button'
);

function handleCloseByEscape(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEscape);
}

function createCard(card) {
  return new Card(card, '.card-template').createCard();
  // return cardElement;
  // return cardElement;
}

function addCard(card) {
  cardsList.prepend(createCard(card));
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  addCard({ name: placeNameInput.value, link: placeLinkInput.value });
  // cardsList.prepend(
  //   new Card(
  //     { name: placeNameInput.value, link: placeLinkInput.value },
  //     '.card-template'
  //   ).createCard()
  // );
  // addCard({ name: placeNameInput.value, link: placeLinkInput.value });
  addPlaceFormElement.reset();
  closePopup(addPlacePopup);
  // toggleButtonState(addPlaceInputList, addPlaceSubmitButton);
}

function handleEditInfoFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(editInfoPopup);
}

popupPlacePhotoFullButtonClose.addEventListener('click', () =>
  closePopup(popupPlacePhotoFull)
);

addPlaceButton.addEventListener('click', () => {
  openPopup(addPlacePopup);
  addPlaceFormElement.reset();
  formValidator.hideError();
  console.log('1');
});
addPlaceButtonClose.addEventListener('click', () => closePopup(addPlacePopup));
addPlaceFormElement.addEventListener('submit', handleAddPlaceFormSubmit);

editInfoButton.addEventListener('click', () => {
  openPopup(editInfoPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
});

editInfoButtonClose.addEventListener('click', () => closePopup(editInfoPopup));
editInfoFormElement.addEventListener('submit', handleEditInfoFormSubmit);

//close on overlay click
function handleCloseOnOverlayClick(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

editInfoPopup.addEventListener('click', (evt) =>
  handleCloseOnOverlayClick(evt, editInfoPopup)
);

popupPlacePhotoFull.addEventListener('click', (evt) =>
  handleCloseOnOverlayClick(evt, popupPlacePhotoFull)
);

addPlacePopup.addEventListener('click', (evt) =>
  handleCloseOnOverlayClick(evt, addPlacePopup)
);

function renderInitialCards() {
  initialCards.forEach((item) => {
    addCard(item);
    // const card = new Card(item, '.card-template');
    // cardsList.prepend(card.createCard());
  });
}

function enableFormValidation() {
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
  });
}

renderInitialCards();

enableFormValidation();

export { fullPhotoImage, fullPhotoCaption, popupPlacePhotoFull };
