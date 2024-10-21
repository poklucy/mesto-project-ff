import { deleteCard, createCard } from './card.js';
import { openModal, closeModal } from './modal.js'; 
import { initialCards } from './cards.js'; 
import '../pages/index.css'; 

// Получение элементов управления
const openEditButton = document.querySelector('.profile__edit-button'); 
const openNewCardButton = document.querySelector('.profile__add-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupCard = document.querySelector('.popup_type_new-card');

// Находим модальное окно и элементы на странице
const profileForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Получаем элементы управления для попапа добавления карточек
const formNewCard = popupCard.querySelector('.popup__form');
const titleInput = popupCard.querySelector('.popup__input_type_card-name');
const linkInput = popupCard.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');


// Функция для вывода всех карточек на страницу
function renderCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });
}

// Рендерим карточки при загрузке страницы
renderCards(initialCards);

function setupPopupClose(popup) {
  if (!popup) return;

  const profileCloseButton = popup.querySelector(".popup__close");

  if (profileCloseButton) {
      profileCloseButton.addEventListener("click", () => {
          closeModal(popup);
      });
  }

  popup.addEventListener("click", (evt) => {
      if (evt.target === popup) {
          closeModal(popup);
      }
  });
}

// Настройка закрытия кнопок и оверлеев для модальных окон
setupPopupClose(popupEdit);
setupPopupClose(popupCard);

// Добавляем обработчики событий для кнопок открытия модальных окон
openEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;  
  jobInput.value = profileDescription.textContent;  
  openModal(popupEdit)
});
openNewCardButton.addEventListener('click', () => openModal(popupCard));

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // Получаем значения полей
  const newName = nameInput.value;
  const newDescription = jobInput.value;

  // Обновляем значения на странице
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  // Закрываем попап
  closeModal(popupEdit);

}


// Прикрепляем обработчик к форме редактирования
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчик формы отправки новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  
  const title = titleInput.value;
  const link = linkInput.value;

  const newCardElement = createCard({ name: title, link: link });
  placesList.prepend(newCardElement); 

  // Закрываем попап и сбрасываем форму
  closeModal(popupCard); 
  formNewCard.reset(); 
}

// Прикрепляем обработчик к форме для события “submit”
formNewCard.addEventListener('submit', handleNewCardSubmit);

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => setupPopupClose(popup));
