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

const cardsList = document.querySelector('.places');

const editInfoButton = document.querySelector('.button_type_edit');
const editInfoPopup = document.querySelector('.popup');
const editInfoButtonClose = editInfoPopup.querySelector('.button_type_close');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector("[name='profile-name']");
const jobInput = formElement.querySelector("[name='profile-bio']");

// функция отрисовки начальных карточек
function renderInitialCards() {
  initialCards.forEach((card, index) => renderInitialCard(card, index));
}

function renderInitialCard(card, index) {
  cardsList.insertAdjacentHTML(
    'beforeend',
    `
    <li class="place">
    <img
      src="${card.link}"
      alt="Изображение карточки ${index + 1}"
      class="place__photo"
    />
    <div class="place__info">
      <h3 class="place__title">${card.name}</h3>
      <button
        class="place__like"
        type="button"
      ></button>
    </div>
  </li>
  `
  );
}

renderInitialCards();

// открытие попапа редактирования профиля
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  editInfoPopup.classList.add('popup_opened');
}

// закрытие попапа редактирования профиля
function closePopup() {
  editInfoPopup.classList.remove('popup_opened');
}

// popup.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     togglePopupClass();
//   }
// });

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup();
}

editInfoButton.addEventListener('click', openPopup);
editInfoButtonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
