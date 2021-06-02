let openPopupButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.button_type_close');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector("[name='profile-name']");
let jobInput = formElement.querySelector("[name='profile-bio']");

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// popup.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     togglePopupClass();
//   }
// });

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // let nameInputValue = nameInput.value;
  // let jobInputValue = jobInput.value;
  let profileName = document.querySelector('.profile__name');
  let profileBio = document.querySelector('.profile__bio');
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup();
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
