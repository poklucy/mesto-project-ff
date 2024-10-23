// Функция для открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(function () {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", handleEscClose);
  setupCloseOnClick(popup);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key && evt.key.toLowerCase() === "escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  }
}

function setupCloseOnClick(popup) {
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(popup));
  }
}

export { openModal, closeModal };