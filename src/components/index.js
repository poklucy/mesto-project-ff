import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getProfileInfo, updateProfileInfo, addNewCard, updateAvatar } from './api.js';
import '../pages/index.css';

// Определение элементов на странице
const openEditButton = document.querySelector('.profile__edit-button');
const openNewCardButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const profileForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewCard = popupCard.querySelector('.popup__form');
const titleInput = popupCard.querySelector('.popup__input_type_card-name');
const linkInput = popupCard.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const profileAvatarButton = document.querySelector('.profile__avatar-button');
const popupAvatarEdit = document.querySelector('.popup_type_avatar_edit');
const popupCloseButton = popupAvatarEdit.querySelector('.popup__close');

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция для открытия попапа с изображением
let imagePopup;

function openImagePopup(title, link) {
  if (!imagePopup) {
    imagePopup = document.querySelector('.popup_type_image');
  }
  
  const imageElement = imagePopup.querySelector('.popup__image');
  const titleElement = imagePopup.querySelector('.popup__caption');
  
  imageElement.src = link;
  imageElement.alt = title;
  titleElement.textContent = title;
  
  openModal(imagePopup);
}

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
  await loadInitialData();
  enableValidation(validationConfig);
  clearValidation(profileForm, validationConfig);
  setUpEventListeners();
});

// Загрузка начальных данных
async function loadInitialData() {
  try {
    const [userInfo, cards] = await Promise.all([getProfileInfo(), getInitialCards()]);
    
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    document.querySelector('.profile__image').style.backgroundImage = `url('${userInfo.avatar}')`;

    renderCards(cards, userInfo);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}

// Настройка обработчиков событий
function setUpEventListeners() {
  openEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
  });

  openNewCardButton.addEventListener('click', () => {
    openModal(popupCard);
  });

  formNewCard.addEventListener('submit', handleNewCardSubmit);
  profileForm.addEventListener('submit', handleProfileFormSubmit);
  popups.forEach(popup => setupPopupClose(popup));

  profileAvatarButton.addEventListener('click', () => {
    openModal(popupAvatarEdit);
  });

  popupCloseButton.addEventListener('click', () => {
    closeModal(popupAvatarEdit);
  });

  const avatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
  avatarForm.addEventListener('submit', handleAvatarFormSubmit);
}

// Обработчик отправки формы обновления аватара
async function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...'; 

  try {
    const newAvatarUrl = document.getElementById('profile-avatar').value; 
    await updateAvatar(newAvatarUrl); 
    closeModal(popupAvatarEdit); 
  } catch (error) {
    console.error("Ошибка при обновлении аватара:", error);
  } finally {
    submitButton.textContent = initialText; 
  }
}
// Обработчик отправки формы профиля
async function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  try {
    const updatedUserInfo = await updateProfileInfo(nameInput.value, jobInput.value);
    profileTitle.textContent = updatedUserInfo.name;
    profileDescription.textContent = updatedUserInfo.about;
    closeModal(popupEdit);
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
  } finally {
    submitButton.textContent = initialText; // Возвращаем текст кнопки
  }
}


async function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  try {
    const newCard = await addNewCard(titleInput.value, linkInput.value);
    const newCardElement = createCard(newCard, openImagePopup);
    placesList.prepend(newCardElement);
    closeModal(popupCard);
    formNewCard.reset();
  } catch (error) {
    console.error("Ошибка при добавлении карточки:", error);
  } finally {
    submitButton.textContent = initialText; 
  }
}


// Рендеринг карточек
function renderCards(cards) {
  cards.forEach(card => {
    const cardElement = createCard(card, openImagePopup);
    placesList.append(cardElement);
  });
}

// Закрытие попапа
function setupPopupClose(popup) {
  if (!popup) return;

  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(popup));
  }

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}

// Слушатель события для открытия попапа с изображением
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('openPopup', (event) => {
    const { link, name } = event.detail;
    openImagePopup(name, link);
  });
});

// Инициализация валидации
enableValidation(validationConfig);
clearValidation(profileForm, validationConfig);