document.addEventListener("DOMContentLoaded", () => {

  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show');
    });

    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.remove('hide');
    tabsContent[index].classList.add('show');
    tabs[index].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, index) => {
        if (target == item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  // Timer
  const deadLine = '2021-02-24';

  function getTimeRange(endtime) {
    const t = new Date(endtime) - new Date(),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
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
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
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

  setClock('.timer', deadLine);

  // Modal window
  const modalWindow = document.querySelector('.modal'),
    modalTrigger = document.querySelectorAll('[data-modal]');
  modalTimer = setTimeout(openModal, 50000);

  function openModal() {
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  function closeModal() {
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  modalTrigger.forEach(item => {
    item.addEventListener('click', openModal);
  });

  modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') == "") {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modalWindow.classList.contains('show')) {
      closeModal();
    }
  });

  window.addEventListener('scroll', showModalByScroll);

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
      const element = document.createElement('div');

      this.classes.push("menu__item");
      this.classes.forEach(className => element.classList.add(className));

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

  getResources("http://localhost:3000/menu")
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new Card(img, altimg, title, descr, price, '.menu .container').render();
      })
    })

  // Forms 

  const forms = document.querySelectorAll('form');

  const message = {
    loading: "icons/spinner.svg",
    success: "Спасибо! Скоро мы свяжемся с Вами!",
    failure: "Что-то пошло не так"
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const msgBox = document.createElement('img');
      msgBox.src = message.loading;
      msgBox.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', msgBox);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          msgBox.remove();
        }).catch(() => {
          msgBox.textContent = message.failure;
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        })
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  fetch("db.json").then(data => data.json()).then(result => console.log(result));

  
  // Slider
  const slides = document.querySelectorAll(".offer__slide");
  const previous = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");
  const counterSlide = document.querySelector("#current");
  const totalCounterSlide = document.querySelector("#total");
  
  let slideIndex = 1;

  showSlides(slideIndex);
  updateCounterSlider(slides.length, totalCounterSlide);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(slide => slide.style.display = "none");

    slides[slideIndex - 1].style.display = "block";

    updateCounterSlider(slideIndex, counterSlide);
  }

  function updateCounterSlider(n, item) {
    if (n < 10) {
      item.innerHTML = `0${n}`;
    } else {
      item.innerHTML = `${n}`;
    }
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  previous.addEventListener("click", () => {
    plusSlides(-1);
  });

  next.addEventListener("click", () => {
    plusSlides(1);
  });

});