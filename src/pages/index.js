import './index.css';

import {
  initialCards,
  validationConfig,
  editInfoButton,
  addPlaceButton,
  addPlaceFormElement,
  addPlacePopupSelector,
  cardTemplateSelector,
  cardsContainerSelector,
  editInfoFormElement,
  editInfoPopupSelector,
  popupFullPhotoSelector,
  bioInput,
  nameInput,
  userData,
} from '../scripts/constants.js';

import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import Card from '../scripts/Card.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

const userInfo = new UserInfo(userData);

const popupFullPhoto = new PopupWithImage(popupFullPhotoSelector);
popupFullPhoto.setEventListeners();

const popupEditInfo = new PopupWithForm(editInfoPopupSelector, (inputData) => {
  userInfo.setUserInfo(inputData);
  popupEditInfo.close();
});

popupEditInfo.setEventListeners();
editInfoButton.addEventListener('click', () => {
  popupEditInfo.open();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  bioInput.value = profileData.bio;
  editInfoFormValidator.hideError();
});

const popupAddPlace = new PopupWithForm(addPlacePopupSelector, (inputData) => {
  const newCard = new Card(inputData, cardTemplateSelector, (name, link) => {
    popupFullPhoto.open(name, link);
  });
  const cardElement = newCard.createCard();
  cardsList.addItem(cardElement);
  popupAddPlace.close();
});

popupAddPlace.setEventListeners();
addPlaceButton.addEventListener('click', () => {
  popupAddPlace.open();
  addPlaceFormElement.reset();
  addPlaceFormValidator.hideError();
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector, (name, link) => {
        popupFullPhoto.open(name, link);
      });
      const cardElement = card.createCard();
      cardsList.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

const editInfoFormValidator = new FormValidator(
  validationConfig,
  editInfoFormElement
);
editInfoFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(
  validationConfig,
  addPlaceFormElement
);
addPlaceFormValidator.enableValidation();

cardsList.renderItems();
