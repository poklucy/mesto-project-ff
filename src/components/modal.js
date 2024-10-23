function openModal(popup) {
  popup.classList.add("popup_is-animated");

  setTimeout(function () {
    popup.classList.add("popup_is-opened");
  }, 1);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}


export { openModal, closeModal };