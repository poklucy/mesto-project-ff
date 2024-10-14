export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

function createCard(data, deleteCardCallback) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Установить состояние лайка
  if (data.liked) {
    likeButton.classList.add("card__like-button_is-active");
}

deleteButton.addEventListener("click", () => {
    deleteCardCallback(cardElement);
  });

  cardImage.addEventListener("click", () => {
      openImageModal(data.link, data.name);
  });

  likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
  });

  return cardElement;
}

// Функция для удаления карточки
function deleteCard(cardElement) {
  if (cardElement && cardElement instanceof HTMLElement) {
      cardElement.remove();
  } else {
      console.error("Неверный элемент для удаления:", cardElement);
  }
}

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


export { createCard, deleteCard};
