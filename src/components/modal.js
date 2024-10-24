// Функция для открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(function () {
    popup.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", handleEscClose);
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

export { openModal, closeModal };