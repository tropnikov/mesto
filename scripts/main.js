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

// Находим форму в DOM
let formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector("[name='profile-name']"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector("[name='profile-bio']"); // Воспользуйтесь инструментом .querySelector()
// console.log(jobInput);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector(".profile__name");
  let profileBio = document.querySelector(".profile__bio");
  profileName.textContent = nameInputValue;
  profileBio.textContent = jobInputValue;

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
