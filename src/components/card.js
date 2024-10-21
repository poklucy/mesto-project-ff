function createCard(data) {
    const cardTemplate = document.getElementById("card-template").content.cloneNode(true).querySelector(".card");
    const deleteButton = cardTemplate.querySelector(".card__delete-button");
    const likeButton = cardTemplate.querySelector(".card__like-button");
    const cardImage = cardTemplate.querySelector(".card__image");

    // Устанавливаем изображение и описание из данных
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTemplate.querySelector(".card__title").textContent = data.name;

    // Устанавливаем статус лайка
    if (data.liked) {
        likeButton.classList.add("card__like-button_is-active");
    }

    // Обработчик удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCard(cardTemplate);
    });

    // Обработчик клика по кнопке лайка
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    // Обработчик клика по изображению для открытия модального окна
    cardImage.addEventListener("click", () => {
        // Открытие модального окна с изображением
        const popupImage = document.querySelector('.popup_type_image');
        const imageElement = popupImage.querySelector('.popup__image');
        const captionElement = popupImage.querySelector('.popup__caption');

        imageElement.src = data.link;
        imageElement.alt = data.name;
        captionElement.textContent = data.name;

        openModal(popupImage);
    });

    return cardTemplate;
}

function openModal(popup) {
    popup.classList.add("popup_is-animated");

    setTimeout(function () {
        popup.classList.add("popup_is-opened");
    }, 1); 
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