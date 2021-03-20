document.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.remove("hide");
    tabsContent[index].classList.add("show");
    tabs[index].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, index) => {
        if (target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  // Timer
  const deadLine = "2021-02-24";

  function getTimeRange(endtime) {
    const t = new Date(endtime) - new Date(),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRange(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadLine);

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

  // Classes for cards
  class Card {
    constructor(src, alt, title, text, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector);
      this.transfer = 27;
      this.converterDollar();
    }

    converterDollar() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement("div");

      this.classes.push("menu__item");
      this.classes.forEach((className) => element.classList.add(className));

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.text}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`;
      this.parentSelector.append(element);
    }
  }

  const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getResources("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(img, altimg, title, descr, price, ".menu .container").render();
    });
  });

  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "icons/spinner.svg",
    success: "Спасибо! Скоро мы свяжемся с Вами!",
    failure: "Что-то пошло не так",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const msgBox = document.createElement("img");
      msgBox.src = message.loading;
      msgBox.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", msgBox);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          msgBox.remove();
        })
        .catch(() => {
          msgBox.textContent = message.failure;
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  fetch("db.json")
    .then((data) => data.json())
    .then((result) => console.log(result));

  // Slider
  const slider = document.querySelector(".offer__slider"),
    slides = document.querySelectorAll(".offer__slide"),
    previous = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    counterSlide = document.querySelector("#current"),
    totalCounterSlide = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesInner = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  slidesInner.style.width = `${100 * slides.length}%`;
  slidesInner.style.display = "flex";
  slidesInner.style.transition = "all 0.5s";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const dotsWrapper = document.createElement("ol"),
    dots = [];

  dotsWrapper.classList.add("carousel-indicators");
  slider.append(dotsWrapper);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-id", i + 1);
    dot.classList.add("dot");

    if (i == 0) {
      dot.style.opacity = "1";
    }
    dotsWrapper.append(dot);
    dots.push(dot);
  }

  slidesWrapper.style.overflow = "hidden";

  updateCounterSlider(slideIndex, counterSlide);
  updateCounterSlider(slides.length, totalCounterSlide);

  function updateCounterSlider(n, item) {
    if (n < 10) {
      item.innerHTML = `0${n}`;
    } else {
      item.innerHTML = `${n}`;
    }
  }

  function refreshDots(index) {
    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[index - 1].style.opacity = "1";
  }

  previous.addEventListener("click", () => {
    if (offset == 0) {
      offset = parseFloat(width) * (slides.length - 1);
      slideIndex = slides.length;
    } else {
      offset -= parseFloat(width);
      --slideIndex;
    }

    updateCounterSlider(slideIndex, counterSlide);

    slidesInner.style.transform = `translateX(-${offset}px)`;

    refreshDots(slideIndex);
  });

  next.addEventListener("click", () => {
    if (offset == parseFloat(width) * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += parseFloat(width);
      ++slideIndex;
    }

    updateCounterSlider(slideIndex, counterSlide);

    slidesInner.style.transform = `translateX(-${offset}px)`;
    refreshDots(slideIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      const slideTo = event.target.getAttribute("data-slide-id");

      slideIndex = slideTo;
      offset = parseFloat(width) * (slideTo - 1);

      slidesInner.style.transform = `translateX(-${offset}px)`;

      updateCounterSlider(slideIndex, counterSlide);
      refreshDots(slideIndex);
    });
  });

  // Calculator
  const totalCalories = document.querySelector(".calculating__result span");
  let height, weight, age;

  let gender = localStorage.getItem("gender")
      ? localStorage.getItem("gender")
      : localStorage.setItem("gender", "female"),
    ratio = localStorage.getItem("ratio")
      ? localStorage.getItem("ratio")
      : localStorage.setItem("ratio", 1.375);

  calcTotal();
  setDefaultOptions("#gender div", "calculating__choose-item_active");
  setDefaultOptions("#activity div", "calculating__choose-item_active");
  getStaticData("#gender div", "calculating__choose-item_active");
  getStaticData("#activity div", "calculating__choose-item_active");
  getDynamicData("#height");
  getDynamicData("#weight");
  getDynamicData("#age");

  function calcTotal() {
    if (!gender || !height || !weight || !age || !ratio) {
      totalCalories.textContent = "___";
      return;
    }

    if (gender == "male") {
      totalCalories.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    } else if (gender == "female") {
      totalCalories.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    }
  }

  function getStaticData(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-ratio")) {
          ratio = +event.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          gender = event.target.getAttribute("id");
          localStorage.setItem("gender", gender);
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  function getDynamicData(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/gi)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";

        switch (input.getAttribute("id")) {
          case "height":
            height = input.value;
            break;
  
          case "weight":
            weight = input.value;
            break;
  
          case "age":
            age = input.value;
            break;
        }
      }

      calcTotal();
    });
  }

  function setDefaultOptions(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") === localStorage.getItem("gender")) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }
});
