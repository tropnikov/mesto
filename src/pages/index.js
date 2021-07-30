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
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

function createCard(item) {
  const card = new Card(item, cardTemplateSelector, (name, link) => {
    popupFullPhoto.open(name, link);
  });
  return card.createCard();
}

const popupAddPlace = new PopupWithForm(addPlacePopupSelector, (inputData) => {
  cardsList.addItem(createCard(inputData));
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
      cardsList.addItem(createCard(item));
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
