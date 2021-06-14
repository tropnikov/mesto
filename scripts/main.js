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

const initialCards = [
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

// список с карточками
const cardsList = document.querySelector('.places');
// шаблон карточки
const cardTemplate = document.querySelector('.card__template').content;

// попап добавления нового места
const addPlaceButton = document.querySelector('.button_type_add');
const addPlacePopup = document.querySelector('.place-add');
const addPlaceButtonClose = document.querySelector('.place-add__close-button');
const addPlaceFormElement = document.querySelector('.place-add__form');
const placeNameInput = addPlaceFormElement.querySelector("[name='place-name']");
const placeLinkInput = addPlaceFormElement.querySelector("[name='place-link']");

const popupPlacePhotoFull = document.querySelector('.place-full-photo');

const popupPlacePhotoFullButtonClose = document.querySelector(
  '.place-full-photo__close-button'
);

// функция отрисовки начальных карточек
function renderInitialCards() {
  initialCards.forEach((card) => renderCard(card));
}

function renderCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.place__photo').src = card.link;
  cardElement.querySelector('.place__photo').alt = card.name;
  cardElement.querySelector('.place__title').innerText = card.name;
  setEventListeners(cardElement);
  cardsList.prepend(cardElement);
}

function handleDelete(evt) {
  evt.target.closest('.place').remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('place__like_active');
}

function handleOpenFull(evt) {
  popupPlacePhotoFull.classList.add('popup_opened');
  popupPlacePhotoFull.querySelector('.place-full-photo__image').src =
    evt.target.src;
  popupPlacePhotoFull.querySelector('.place-full-photo__caption').textContent =
    evt.target.parentNode.querySelector('.place__title').textContent;
}

function closePhotoFullPopup() {
  popupPlacePhotoFull.classList.remove('popup_opened');
}

function setEventListeners(element) {
  element
    .querySelector('.place__delete')
    .addEventListener('click', handleDelete);
  element.querySelector('.place__like').addEventListener('click', handleLike);
  element
    .querySelector('.place__photo')
    .addEventListener('click', handleOpenFull);
}

// открытие попапа добавления карточки с фотографией
function openAddPlacePopup() {
  addPlacePopup.classList.add('popup_opened');
  placeNameInput.value = '';
  placeLinkInput.value = '';
}

// закрытие попапа добавления нового места
function closeAddPlacePopup() {
  addPlacePopup.classList.remove('popup_opened');
}

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({ name: placeNameInput.value, link: placeLinkInput.value });
  closeAddPlacePopup();
}

// открытие попапа редактирования профиля
function openEditInfoPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  editInfoPopup.classList.add('popup_opened');
}

// закрытие попапа редактирования профиля
function closeEditInfoPopup(evt) {
  console.log(evt);
  editInfoPopup.classList.remove('popup_opened');
}

function editInfoFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeEditInfoPopup();
}

renderInitialCards();

popupPlacePhotoFullButtonClose.addEventListener('click', closePhotoFullPopup);

addPlaceButton.addEventListener('click', openAddPlacePopup);
addPlaceButtonClose.addEventListener('click', closeAddPlacePopup);
addPlaceFormElement.addEventListener('submit', addPlaceFormSubmitHandler);

editInfoButton.addEventListener('click', openEditInfoPopup);
editInfoButtonClose.addEventListener('click', closeEditInfoPopup);
editInfoFormElement.addEventListener('submit', editInfoFormSubmitHandler);
