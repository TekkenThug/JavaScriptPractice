function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // Slider
  const slider = document.querySelector(container),
    slides = document.querySelectorAll(slide),
    previous = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    counterSlide = document.querySelector(currentCounter),
    totalCounterSlide = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesInner = document.querySelector(field),
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
}

export default slider;
