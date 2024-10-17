
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



export {createCard, deleteCard};
