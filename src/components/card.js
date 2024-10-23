function createCard(data, cardDelete, likeCard, openCard) {
  const cardTemplate = document.getElementById("card-template").content.cloneNode(true).querySelector(".card");
  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  const likeButton = cardTemplate.querySelector(".card__like-button");
  const cardImage = cardTemplate.querySelector(".card__image");
  const popup = document.querySelector('.popup_type_image');
  const popuplmage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTemplate.querySelector(".card__title").textContent = data.name;

  likeButton.addEventListener("click", () => {
    likeCard(data);
  });

  function likeCard(evt) {
    likeButton.classList.toggle('card__like-button_is-active');
  }

  deleteButton.addEventListener('click', () => {
    cardDelete(cardTemplate);
  });

  function cardDelete(cardElement) {
    cardElement.remove();
  }

  cardImage.addEventListener("click", () => {
    openCard(data.link, data.name);
  });

  function openCard(imageSrc, imageAlt) {
    popuplmage.src = imageSrc;
    popuplmage.alt = imageAlt;

    popupCaption.textContent = imageAlt;
    popup.classList.add("popup_is-animated");

    setTimeout(function () {
      popup.classList.add("popup_is-opened");
    }, 1);
  }

  return cardTemplate;
}

export { createCard };
