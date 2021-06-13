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
const addPlacePopup = document.querySelector('.popup__place-add');
const addPlaceButtonClose = document.querySelector(
  '.popup__place-add_close-button'
);
const addPlaceFormElement = document.querySelector('.popup__place-add_form');
const placeNameInput = addPlaceFormElement.querySelector("[name='place-name']");
const placeLinkInput = addPlaceFormElement.querySelector("[name='place-link']");

// лайк карточки
// const likeButton = document.querySelector('.place__like');

// попап редактирования профиля
const editInfoButton = document.querySelector('.button_type_edit');
const editInfoPopup = document.querySelector('.popup__profile-edit');
const editInfoButtonClose = editInfoPopup.querySelector(
  '.popup__profile-edit_close-button'
);

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const editInfoFormElement = document.querySelector('.popup__profile-edit_form');
const nameInput = editInfoFormElement.querySelector("[name='profile-name']");
const jobInput = editInfoFormElement.querySelector("[name='profile-bio']");

// функция отрисовки начальных карточек
function renderInitialCards() {
  initialCards.forEach((card) => renderCard(card));
}

// Изображение карточки ${initialCards.indexOf(card) + 1}

function renderCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.place__photo').src = card.link;
  cardElement.querySelector('.place__photo').alt = card.name;
  cardElement.querySelector('.place__title').innerText = card.name;
  setEventListeners(cardElement);
  cardsList.prepend(cardElement);
  //  cardsList.insertAdjacentHTML(
  //   'afterbegin',
  //   `
  //   <li class="place">
  //   <img
  //     src="${card.link}"
  //     alt="${card.name}"
  //     class="place__photo"
  //   />
  //   <div class="place__info">
  //     <h3 class="place__title">${card.name}</h3>
  //     <button
  //       class="place__like"
  //       type="button"
  //     ></button>
  //   </div>
  // </li>
  // `
  // );
}

renderInitialCards();

function handleDelete(evt) {
  evt.target.closest('.place').remove();
}

function setEventListeners(element) {
  element
    .querySelector('.place__delete')
    .addEventListener('click', handleDelete);
}

// открытие попапа добавления карточки с фотографией
function openAddPlacePopup() {
  addPlacePopup.classList.add('popup_opened');
  placeNameInput.value = '';
  placeLinkInput.value = '';
  // debugger;
}

// закрытие попапа добавления нового места
function closeAddPlacePopup() {
  addPlacePopup.classList.remove('popup_opened');
}

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // let card = { name: placeNameInput.value, link: placeLinkInput.value };
  // debugger;
  renderCard({ name: placeNameInput.value, link: placeLinkInput.value });
  closeAddPlacePopup();
}

// function likeCard(evt) {
//   console.log(evt);
//   likeButton.classList.toggle('place__like_active');
//   // likeButton.classList.add('place__like_active');
// }

// открытие попапа редактирования профиля
function openEditInfoPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  editInfoPopup.classList.add('popup_opened');
}

// закрытие попапа редактирования профиля
function closeEditInfoPopup() {
  editInfoPopup.classList.remove('popup_opened');
}

// popup.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     togglePopupClass();
//   }
// });

function editInfoFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeEditInfoPopup();
}

// deleteCardButton.addEventListener('click', deleteCard);

addPlaceButton.addEventListener('click', openAddPlacePopup);
addPlaceButtonClose.addEventListener('click', closeAddPlacePopup);
addPlaceFormElement.addEventListener('submit', addPlaceFormSubmitHandler);

editInfoButton.addEventListener('click', openEditInfoPopup);
editInfoButtonClose.addEventListener('click', closeEditInfoPopup);
editInfoFormElement.addEventListener('submit', editInfoFormSubmitHandler);
