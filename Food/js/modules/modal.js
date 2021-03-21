function modal() {
  // Modal window
  const modalWindow = document.querySelector(".modal"),
    modalTrigger = document.querySelectorAll("[data-modal]");
  modalTimer = setTimeout(openModal, 50000);

  function openModal() {
    modalWindow.classList.add("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }

  function closeModal() {
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
  }

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modalWindow.classList.contains("show")) {
      closeModal();
    }
  });

  window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;
