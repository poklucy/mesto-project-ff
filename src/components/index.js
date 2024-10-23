import { createCard, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';
import '../pages/index.css';

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
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');


function renderCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });
}

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

function openImagePopup(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupImageCaption.textContent = name;
  openModal(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCardElement = createCard({ name: titleInput.value, link: linkInput.value });
  placesList.prepend(newCardElement);
  closeModal(popupCard);
  formNewCard.reset();
}

function setUpEventListeners() {
  openEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
  });

  openNewCardButton.addEventListener('click', () => openModal(popupCard));

  placesList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
      const cardName = evt.target.closest('.card').querySelector('.card__title').textContent;
      const cardLink = evt.target.src;
      openImagePopup(cardName, cardLink);
    }
  });

  formNewCard.addEventListener('submit', handleNewCardSubmit);
  profileForm.addEventListener('submit', handleProfileFormSubmit);

  popups.forEach(popup => setupPopupClose(popup));
}

renderCards(initialCards);
setUpEventListeners();