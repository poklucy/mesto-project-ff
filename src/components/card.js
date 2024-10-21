// Функция для удаления карточки
  function deleteCard(cardElement) {
    if (cardElement && cardElement instanceof HTMLElement) {
        cardElement.remove();
    } else {
        console.error("Неверный элемент для удаления:", cardElement);
    }
  }

  export {deleteCard};