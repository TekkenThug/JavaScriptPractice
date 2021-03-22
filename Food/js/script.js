import tabs from "./modules/tabs";
import timer from "./modules/timer";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calculator from "./modules/calculator";
import modal from "./modules/modal";
import openModal from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 30000);

  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  timer(".timer", "2021-05-05");
  cards();
  forms("form", modalTimerId);
  calculator();
  modal("[data-modal]", ".modal", modalTimerId);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
    totalCounter: "#total",
    currentCounter: "#current"
  });
});
