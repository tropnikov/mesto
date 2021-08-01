export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

export const editInfoButton = document.querySelector('.button_type_edit');
export const editInfoFormElement = document.querySelector(
  '.profile-edit__form'
);
export const nameInput = editInfoFormElement.querySelector("[name='name']");
export const bioInput = editInfoFormElement.querySelector("[name='bio']");
export const addPlaceButton = document.querySelector('.button_type_add');
export const addPlaceFormElement = document.querySelector('.place-add__form');
export const addPlacePopupSelector = '.place-add';
export const editInfoPopupSelector = '.profile-edit';
export const confirmDeletionPopupSelector = '.card-delete-confirmation';
export const popupFullPhotoSelector = '.place-full-photo';
export const cardTemplateSelector = '.card-template';
export const cardsContainerSelector = '.places';
export const profileNameSelector = '.profile__name';
export const profileBioSelector = '.profile__bio';
export const profileAvatarSelector = '.profile__avatar';
export const userData = {
  profileNameSelector,
  profileBioSelector,
  profileAvatarSelector,
};
