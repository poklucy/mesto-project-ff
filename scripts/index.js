// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Функция для создания карточки
function createCard(data, deleteCardCallback) {
  // Клонируем шаблон
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card"); // Получаем именно карточку
  
  // Устанавливаем значения для элементов карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  
  // Добавляем обработчик клика для иконки удаления
  deleteButton.addEventListener("click", () => {
      deleteCardCallback(cardElement);
  });
  
  return cardElement;
}

// Функция для вывода всех карточек на страницу
function renderCards(cards) {
  const placesList = document.querySelector(".places__list");
  
  cards.forEach(cardData => {
      const cardElement = createCard(cardData, deleteCard);
      placesList.appendChild(cardElement);
  });
}

// Функция для удаления карточки
function deleteCard(cardElement) {
  if (cardElement && cardElement instanceof HTMLElement) { // Проверка типа
      cardElement.remove(); // Удаляем элемент карточки со страницы
  } else {
      console.error("Неверный элемент для удаления:", cardElement);
  }
}

// Выводим карточки на страницу
renderCards(initialCards);