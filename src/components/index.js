import { deleteCard, createCard }  from './card.js'; 
import { openModal, closeModal, setupPopupClose} from './modal.js'; 
import { initialCards }  from './cards.js'; 
import '../pages/index.css'; 


// Получение элементов управления
const openEditButton = document.querySelector('.profile__edit-button'); 
const openNewCardButton = document.querySelector('.profile__add-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image'); 

// Находим модальное окно и элементы на странице
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Получаем элементы управления для попапа добавления карточек
const formNewCard = popupNewCard.querySelector('.popup__form');
const titleInput = popupNewCard.querySelector('.popup__input_type_card-name');
const linkInput = popupNewCard.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');


// Функция для вывода всех карточек на страницу
function renderCards(cards) {
  const placesList = document.querySelector(".places__list");

  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });
}
 // Рендерим карточки при загрузке страницы
renderCards(initialCards);

// Функция для создания новой карточки
function createNewCard(title, link) {
  const cardTemplate = document.getElementById('card-template').content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;

  // Пример для удаления карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
      cardElement.remove();
  });

  return cardElement;
}

// Функция для открытия модального окна с изображением
function openImageModal(link, name) {
  const openImage = document.querySelector('.popup_type_image');
  const imageElement = openImage.querySelector('.popup__image');
  const captionElement = openImage.querySelector('.popup__caption');

  imageElement.src = link;
  imageElement.alt = name;
  captionElement.textContent = name;

  openModal(openImage);
}
placesList.addEventListener('click', (evt) => {
  const cardImage = evt.target.closest('.card__image'); 
  if (cardImage) {
    const link = cardImage.src;
    const name = cardImage.alt;
    openImageModal(link, name);
  }
});

// Настройка закрытия кнопок и оверлеев для модальных окон
setupPopupClose(popupEdit);
setupPopupClose(popupNewCard);
setupPopupClose(popupImage);

// Добавляем обработчики событий для кнопок открытия модальных окон
openEditButton.addEventListener('click', () => openModal(popupEdit));
openNewCardButton.addEventListener('click', () => openModal(popupNewCard));


// Функция, которая открывает попап и заполняет поля формы текущими значениями профиля
function openPopup() {
    nameInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
    popup.classList.add('popup');
}

// Обработчик клика по кнопке редактирования
profileEditButton.addEventListener('click', openPopup);

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  // Получаем значения полей
  const newName = nameInput.value;
  const newDescription = jobInput.value;

  // Обновляем значения на странице
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  // Закрываем попап
  closeModal(popup);
}

// Прикрепляем обработчик к форме для события “submit”
formElement.addEventListener('submit', handleFormSubmit);


// Обработчик формы отправки новой карточки
function handleNewCardSubmit(evt) {
    evt.preventDefault();
    
    const title = titleInput.value;
    const link = linkInput.value;

    const newCardElement = createNewCard(title, link);
    placesList.prepend(newCardElement); 

    // Закрываем попап
    closeModal(popupNewCard); 
    formNewCard.reset(); 
}

// Прикрепляем обработчик к форме для события “submit”
formNewCard.addEventListener('submit', handleNewCardSubmit);