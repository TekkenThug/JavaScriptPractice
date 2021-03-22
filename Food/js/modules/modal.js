function openModal(modalSelector, modalTimer) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("show");
  document.body.style.overflow = "hidden";

  console.log(modalTimer);
  if (modalTimer) {
    clearInterval(modalTimer);
  }
}

function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal window
  const modalWindow = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", () =>
      openModal(modalSelector, modalTimerId)
    );
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modalWindow.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal, openModal };
