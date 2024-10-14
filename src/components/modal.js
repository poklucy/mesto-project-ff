

// Функция для открытия модального окна
function openModal(popup) {
  if (popup) {
    popup.classList.add("popup_is-opened"); 
    popup.classList.remove("popup_is-animated");
    popup.style.opacity = 0;                          
    popup.style.visibility = 'visible';                
    popup.style.display = 'flex';                      

    // Используем requestAnimationFrame для переключения opacity на 1
    requestAnimationFrame(() => {
      popup.style.transition = 'opacity 0.6s'; 
      popup.style.opacity = 1;                  
      popup.style.pointerEvents = 'auto';      
    });

    document.addEventListener("keydown", handleEscClose);
  }
}


// Функция для закрытия модального окна
function closeModal(popup) {
  if (popup) {
    // Устанавливаем анимацию закрытия
    popup.style.opacity = 0;
    popup.style.pointerEvents = 'none'; // отключаем событие щелчка
    popup.classList.add("popup_is-animated");

    document.removeEventListener("keydown", handleEscClose);
  }
}


// Обработчик нажатия клавиши Escape для закрытия открытого модального окна
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    if (popupOpened) {
      closeModal(popupOpened);
    }
  }
}



// Функция для обработки клика на оверлей и кнопке закрытия
function setupPopupClose(popup) {
  if (!popup) return;

  const closeButton = popup.querySelector(".popup__close");

  // Закрытие по нажатию на кнопку закрытия
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal(popup);
    });
  }

  popup.addEventListener("click", (evt) => {
    // Проверяем, что клик был именно на оверлей, а не на контент модального окна
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}

export  { openModal, closeModal, setupPopupClose};