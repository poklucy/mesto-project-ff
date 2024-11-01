import { addLike, removeLike,  deleteCardApi } from './api.js';

function createCard(data, userId, openImagePopup) {
  const currentUserId = userId; 
  const cardTemplate = document.getElementById("card-template").content.cloneNode(true).querySelector(".card");
  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  const likeButton = cardTemplate.querySelector(".card__like-button");
  const cardImage = cardTemplate.querySelector(".card__image");
  const likeCounter = cardTemplate.querySelector(".card__like-counter");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTemplate.querySelector(".card__title").textContent = data.name;
  likeCounter.textContent = data.likes.length;

  if (data.likes.some(like => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    handleLikeClick(data._id, likeButton, likeCounter);
  });

  if (data.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      handleDeleteButtonClick(data._id, cardTemplate);
    });
  }

  cardImage.addEventListener('click', () => {
    openImagePopup(data.name, data.link);
  });

  return cardTemplate;
}



function handleLikeClick(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  
  const likeAction = isLiked ? removeLike(cardId) : addLike(cardId);
  
  likeAction
    .then(data => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = data.likes.length; 
    })
    .catch(error => {
      console.error('Ошибка при лайке карточки:', error);
    });
}

function deleteCard(cardId, cardElement) {
  deleteCardApi(cardId) 
    .then(() => {
      cardElement.remove(); 
    })
    .catch(error => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

function handleDeleteButtonClick(cardId, cardElement) {
  deleteCard(cardId, cardElement); 
}

export { createCard };