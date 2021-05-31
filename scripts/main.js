let openPopup = document.querySelector(".popup-open");
let popup = document.querySelector(".popup");
let closePopup = popup.querySelector(".popup__close");

openPopup.addEventListener("click", togglePopupClass);

closePopup.addEventListener("click", togglePopupClass);

function togglePopupClass() {
  popup.classList.toggle("popup_opened");
}

// popup.addEventListener("click", function (event) {
//   if (event.target === event.currentTarget) {
//     togglePopupClass();
//   }
// });

let formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
let nameInput = formElement.querySelector("[name='profile-name']"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector("[name='profile-bio']"); // Воспользуйтесь инструментом .querySelector()

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  let profileName = document.querySelector(".profile__name");
  let profileBio = document.querySelector(".profile__bio");
  profileName.textContent = nameInputValue;
  profileBio.textContent = jobInputValue;
}

formElement.addEventListener("submit", formSubmitHandler);
