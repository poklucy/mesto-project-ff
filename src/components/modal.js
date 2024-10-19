function openModal(popup) {
  popup.classList.add("popup_is-opened");
  window.addEventListener('keydown', EscClose);

  const popupEdit = document.querySelector('.popup_type_edit');
  const nameInput = popupEdit.querySelector('.popup__input_type_name');
  const jobInput = popupEdit.querySelector('.popup__input_type_description');
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  if (popup.classList.contains('popup_type_edit')) {
    nameInput.value = profileTitle.textContent; 
    jobInput.value = profileDescription.textContent; 
  }

  popup.classList.add('popup');
}


// функция закрытия модального окна + вызов функции очистки форм
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  window.removeEventListener('keydown', EscClose);
}


function EscClose(evt) {
  if(evt.key) {
    if(evt.key.toLowerCase() === "escape") {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }  
  }
}

function setupPopupClose(popup) {
  if (!popup) return;

  const closeButton = popup.querySelector(".popup__close");

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal(popup);
    });
  }

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}

const popups = document.querySelectorAll('.popup');
popups.forEach(setupPopupClose);

export  { openModal, closeModal, setupPopupClose};