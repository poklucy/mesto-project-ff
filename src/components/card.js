import { openModal } from './modal.js'; 

function createCard(data) {
    const cardTemplate = document.getElementById("card-template").content.cloneNode(true).querySelector(".card");
    const cardTitle = cardTemplate.querySelector(".card__title");
    const cardImage = cardTemplate.querySelector(".card__image");
    const deleteButton = cardTemplate.querySelector(".card__delete-button");
    const likeButton = cardTemplate.querySelector(".card__like-button");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    // Устанавливаем статус лайка
    if (data.liked) {
        likeButton.classList.add("card__like-button_is-active");
    }

    // Обработчик удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCard(cardTemplate);
    });

    // Обработчик клика по изображению для открытия модального окна
    cardImage.addEventListener("click", () => {
        // Открытие модального окна внутри функции
        const popupImage = document.querySelector('.popup_type_image');
        const imageElement = popupImage.querySelector('.popup__image');
        const captionElement = popupImage.querySelector('.popup__caption');

        imageElement.src = data.link;
        imageElement.alt = data.name;
        captionElement.textContent = data.name;

        openModal(popupImage);
    });

    // Обработчик клика по кнопке лайка
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