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
export const bioInput = editInfoFormElement.querySelector("[name='about']");
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
export const userDataSelectors = {
  profileNameSelector,
  profileBioSelector,
  profileAvatarSelector,
};
export const deletePlaceButton = document.querySelector('.button_type_delete');
export const deletePlacePopupSelector = '.place__delete';
export const updateAvatarPopupSelector = '.avatar-update';
export const updateProfileAvatarButton =
  document.querySelector('.profile__avatar');
export const updateAvatarFormElement = document.querySelector(
  '.avatar-update__form'
);
export const serverUrl = 'https://mesto.nomoreparties.co/v1/cohort-27';
export const token = '37580e29-ca43-4e60-bfc4-9731d6167691';
