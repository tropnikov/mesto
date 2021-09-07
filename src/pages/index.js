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
  confirmDeletionPopupSelector,
  updateAvatarPopupSelector,
  updateProfileAvatarButton,
  updateAvatarFormElement,
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '37580e29-ca43-4e60-bfc4-9731d6167691',
    'Content-Type': 'application/json',
  },
});

function getUserDataFromServer() {
  const profileDataPromise = api.getUserData();
  profileDataPromise
    .then((result) => {
      myUserId = result._id;
      userInfo.setUserInfo({
        name: result.name,
        bio: result.about,
        // avatar: result.avatar,
        id: result._id,
      });
      userInfo.setAvatar(result);
      // editInfoFormValidator.hideError();
    })
    .catch((err) => {
      console.log(err);
    });
}

const userInfo = new UserInfo(userDataSelectors);
getUserDataFromServer();

const cardsPromise = api.getInitialCards();

function likeCard(card) {
  console.log(card.isLiked());
  const checkForLike = card.isLiked()
    ? api.dislikeCard(card.getCardId())
    : api.likeCard(card.getCardId());
  checkForLike
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => console.log(err));
}

function deleteCard(card) {
  popupDeletePlace.open();
  popupDeletePlace.setFormHandler(() => {
    popupDeletePlace.renderLoading(true);
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDeletePlace.renderLoading(false);
        popupDeletePlace.close();
      });
  });
}

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
  })
  .catch((err) => {
    console.log(err);
  });

const popupFullPhoto = new PopupWithImage(popupFullPhotoSelector);
popupFullPhoto.setEventListeners();

const popupEditInfo = new PopupWithForm(editInfoPopupSelector, (inputData) => {
  popupEditInfo.renderLoading(true);

  api
    .saveUserData(inputData)
    .then(() => {
      userInfo.setUserInfo(inputData);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditInfo.renderLoading(false);
      popupEditInfo.close();
    });
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
  popupAddPlace.renderLoading(true);
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
    })
    .finally(() => {
      popupAddPlace.renderLoading(false);
      popupAddPlace.close();
    });
});

popupAddPlace.setEventListeners();
addPlaceButton.addEventListener('click', () => {
  popupAddPlace.open();
  addPlaceFormElement.reset();
  addPlaceFormValidator.hideError();
});

const popupUpdateAvatar = new PopupWithForm(
  updateAvatarPopupSelector,
  (input) => {
    popupUpdateAvatar.renderLoading(true);
    api
      .updateAvatar(input)
      .then((result) => {
        userInfo.setAvatar(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
        popupUpdateAvatar.close();
      });
  }
);

popupUpdateAvatar.setEventListeners();
updateProfileAvatarButton.addEventListener('click', () => {
  popupUpdateAvatar.open();
});

const popupDeletePlace = new PopupWithConfirmation(
  confirmDeletionPopupSelector
);
popupDeletePlace.setEventListeners();

const updateAvatarFormValidator = new FormValidator(
  validationConfig,
  updateAvatarFormElement
);
updateAvatarFormValidator.enableValidation();

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
