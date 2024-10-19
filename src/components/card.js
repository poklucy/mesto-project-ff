function createCard(data, openImageModal) { 
  const cardTemplate = document.getElementById("card-template").content.cloneNode(true).querySelector(".card");
  const cardTitle = cardTemplate.querySelector(".card__title");
  const cardImage = cardTemplate.querySelector(".card__image");
  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  const likeButton = cardTemplate.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  if (data.liked) {
      likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener('click', () => {
      cardTemplate.remove();
  });


  cardImage.addEventListener("click", () => {
      openImageModal(data.link, data.name);
  });

  likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
  });

  return cardTemplate;
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
