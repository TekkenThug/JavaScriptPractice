function calculator() {
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
}

export default calculator;
