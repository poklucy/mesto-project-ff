function openModal(popup) {
  if (popup) {
    popup.style.opacity = 0; 
    popup.classList.add("popup_is-opened");

    setTimeout(() => {
      popup.style.opacity = 1; 
    }, 50); 
    document.addEventListener("keydown", handleEscClose);
  }
}

function closeModal(popup) {
  if (popup) {
    popup.style.opacity = 0; 
    popup.classList.remove("popup_is-opened");

    setTimeout(() => {
      popup.style.pointerEvents = 'none'; 
    }, 600); 
    document.removeEventListener("keydown", handleEscClose);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    if (popupOpened) {
      closeModal(popupOpened);
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