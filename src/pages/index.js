import './index.css';

import {
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
  userDataSelectors,
  profileAvatarSelector,
  confirmDeletionPopupSelector,
  deletePlaceButton,
  deletePlacePopupSelector,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

export let myUserId = null;
// let cardId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '37580e29-ca43-4e60-bfc4-9731d6167691',
    'Content-Type': 'application/json',
  },
});

//? Promise.all;

function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: cardTemplateSelector,
    handleCardClick: (name, link) => {
      popupFullPhoto.open(name, link);
    },
    handleCardDelete: (cardInstance) => {
      deleteCard(cardInstance);
    },
    handleCardLike: (cardInstance) => {
      likeCard(cardInstance);
    },
  });
  return card.createCard();
}

function likeCard(card) {
  console.log(card);
  // card.likes.some((element) => {
  //   if (element._id === myUserId) {
  //     api.likeCard(card.cardId);
  //   } else {
  //     api.dislikeCard(card.cardId);
  //   }
  // });
}

function deleteCard(card) {
  popupDeletePlace.open();
  popupDeletePlace.setFormHandler(() => {
    api.deleteCard(card.getCardId()).then(() => {
      card.deleteCard();
      popupDeletePlace.close();
    });
  });
}

const userInfo = new UserInfo(userDataSelectors);
getUserDataFromServer();

const cardsPromise = api.getInitialCards();

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardsContainerSelector
);

cardsPromise
  .then((data) => {
    cardsList.renderItems(data);
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

function getUserDataFromServer() {
  const profileDataPromise = api.getUserData();
  profileDataPromise
    .then((result) => {
      myUserId = result._id;
      console.log(myUserId);
      userInfo.setUserInfo({
        name: result.name,
        bio: result.about,
        avatar: result.avatar,
        id: result._id,
      });
      // editInfoFormValidator.hideError();
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupFullPhoto = new PopupWithImage(popupFullPhotoSelector);
popupFullPhoto.setEventListeners();

const popupEditInfo = new PopupWithForm(editInfoPopupSelector, (inputData) => {
  userInfo.setUserInfo(inputData);
  api.saveUserData(inputData);
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
  inputData.likes = [];
  inputData.owner = { _id: myUserId };
  api
    .addNewCard(inputData)
    .then((result) => {
      inputData._id = result._id;
      cardsList.addItem(createCard(inputData), false);
    })
    .catch((err) => {
      console.log(err);
    });
  popupAddPlace.close();
});

popupAddPlace.setEventListeners();
addPlaceButton.addEventListener('click', () => {
  popupAddPlace.open();
  addPlaceFormElement.reset();
  addPlaceFormValidator.hideError();
});

const popupDeletePlace = new PopupWithConfirmation(
  confirmDeletionPopupSelector
);

popupDeletePlace.setEventListeners();

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

// console.log(myUserId);
