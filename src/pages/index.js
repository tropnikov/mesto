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
  token,
  serverUrl,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

let myUserId = null;

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
});

const userInfo = new UserInfo(userDataSelectors);

function likeCard(card) {
  const checkForLike = card.isLiked()
    ? api.dislikeCard(card.getCardId())
    : api.likeCard(card.getCardId());
  checkForLike
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCard(card) {
  popupDeletePlace.open();
  popupDeletePlace.setFormHandler(() => {
    popupDeletePlace.renderLoading(true);
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        popupDeletePlace.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDeletePlace.renderLoading(false);
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
    myUserId: myUserId,
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

Promise.all([api.getUserData(), api.getInitialCards()])
  .then((data) => {
    const [userData, cardsData] = data;
    myUserId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

// popups and theirs listeners
const popupFullPhoto = new PopupWithImage(popupFullPhotoSelector);
popupFullPhoto.setEventListeners();

const popupEditInfo = new PopupWithForm(editInfoPopupSelector, (inputData) => {
  popupEditInfo.renderLoading(true);
  api
    .saveUserData(inputData)
    .then(() => {
      userInfo.setUserInfo(inputData);
      popupEditInfo.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditInfo.renderLoading(false);
    });
});

popupEditInfo.setEventListeners();
editInfoButton.addEventListener('click', () => {
  popupEditInfo.open();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  bioInput.value = profileData.about;
  editInfoFormValidator.hideError();
});

const popupAddPlace = new PopupWithForm(addPlacePopupSelector, (inputData) => {
  popupAddPlace.renderLoading(true);
  api
    .addNewCard(inputData)
    .then((result) => {
      cardsList.addItem(
        createCard({
          name: inputData.name,
          link: inputData.link,
          likes: [],
          owner: { _id: myUserId },
          _id: result._id,
        }),
        false
      );
      popupAddPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddPlace.renderLoading(false);
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
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
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

// forms validation
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
