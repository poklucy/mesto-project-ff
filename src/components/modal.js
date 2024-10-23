function openModal(modal) {
  modal.classList.add("popup_is-animated");

  setTimeout(function () {
    modal.classList.add("popup_is-opened");
  }, 1);

  document.addEventListener("keydown", escClose);
  modal
    .querySelector(".popup__close")
    .addEventListener("click", escClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function escClose(evt) {
  if (evt.key) {
    if (evt.key.toLowerCase() === "escape") {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }
  }
}

export { openModal, closeModal };