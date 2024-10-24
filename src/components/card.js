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
    openImagePopup(data.link, data.name);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  return cardTemplate;
}

function openImagePopup(imageSrc, imageAlt) {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;

  popupCaption.textContent = imageAlt;
  popup.classList.add("popup_is-animated");

  setTimeout(function () {
    popup.classList.add("popup_is-opened");
  }, 1);

  function closePopupOnEsc(event) {
    if (event.key === "Escape") {
      popup.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", closePopupOnEsc);
    }
  }

  document.addEventListener("keydown", closePopupOnEsc);
}



function deleteCard(cardElement) {
  if (cardElement && cardElement instanceof HTMLElement) {
    cardElement.remove();
  } else {
    console.error("Неверный элемент для удаления:", cardElement);
  }
}


export { createCard, deleteCard };