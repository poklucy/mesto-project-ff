function createCard(data) {
  const cardTemplate = document.getElementById("card-template").content.cloneNode(true).querySelector(".card");
  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  const likeButton = cardTemplate.querySelector(".card__like-button");
  const cardImage = cardTemplate.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTemplate.querySelector(".card__title").textContent = data.name;

  if (data.liked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener('click', () => {
    deleteCard(cardTemplate);
  });

  cardImage.addEventListener("click", () => {
    const event = new CustomEvent('openPopup', { detail: { link: data.link, name: data.name } });
    document.dispatchEvent(event);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  return cardTemplate;
}

function deleteCard(cardElement) {
  if (cardElement && cardElement instanceof HTMLElement) {
    cardElement.remove();
  } else {
    console.error("Неверный элемент для удаления:", cardElement);
  }
}


export { createCard, deleteCard };