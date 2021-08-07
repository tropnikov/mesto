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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '3936a02f-bc3d-48a7-bceb-bcb201e7df53',
    'Content-Type': 'application/json',
  },
});

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
    console.log(data);
    cardsList.renderItems(data);
    // return data;
  })
  .catch((err) => {
    console.log(err);
  });
// cardsList.renderItems(cardsPromise);

// console.log(data);
//       return data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });},
// userInfo.setUserInfo(getUserDataFromServer());

// return result;

// const cardsPromise = api.getInitialCards();
// cardsPromise
//   .then((res) => {
//     // console.log(res);

//   .catch((err) => {
//     console.log(err);
//   });

function getUserDataFromServer() {
  const profileDataPromise = api.getUserData();
  profileDataPromise
    .then((result) => {
      const serverUserData = {};
      serverUserData.name = result.name;
      serverUserData.bio = result.about;
      serverUserData.avatar = result.avatar;
      serverUserData.id = result._id;
      myUserId = result._id;
      console.log(serverUserData);
      // document.querySelector(profileAvatarSelector).src = result.avatar;
      userInfo.setUserInfo(serverUserData);
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
  // getUserDataFromServer();
});

// function getCardId(card) {
//   return card.getCardId();
// }

function createCard(item) {
  const card = new Card(
    item,
    cardTemplateSelector,
    (name, link) => {
      popupFullPhoto.open(name, link);
    },
    (cardInstance) => {
      console.log('opened');
      popupDeletePlace.open();
      const cardId = cardInstance.getCardId();
      console.log(cardId);
    }
  );
  return card.createCard();
}

const popupAddPlace = new PopupWithForm(addPlacePopupSelector, (inputData) => {
  inputData.likes = [];
  // inputData.owner._id = '';

  inputData.owner = { _id: userInfo.getUserInfo().id };
  console.log(inputData.owner);

  cardsList.addItem(createCard(inputData));
  api.addNewCard(inputData);
  popupAddPlace.close();
});

popupAddPlace.setEventListeners();
addPlaceButton.addEventListener('click', () => {
  popupAddPlace.open();
  addPlaceFormElement.reset();
  addPlaceFormValidator.hideError();
});

const popupDeletePlace = new PopupWithConfirmation(
  confirmDeletionPopupSelector,
  () => {
    // api.deleteCard(cardId);

    popupDeletePlace.close();
  }
);
popupDeletePlace.setEventListeners();
// deletePlaceButton.addEventListener('click', () => {
//   popupDeletePlace.open();
// });
// const popupDeleteCard = new PopupWithForm(confirmDeletionPopupSelector, () => {
//   popupDeleteCard.close();
// });
// popupDeleteCard.setEventListeners();
// function getInitialCardsFromServer() {

// }

// const cardsList = new Section(
//   {
//     items: getInitialCardsFromServer(),
//     renderer: (item) => {
//       cardsList.addItem(createCard(item));
//     },
//   },
//   cardsContainerSelector
// );

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
