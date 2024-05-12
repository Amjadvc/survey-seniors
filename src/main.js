const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fomData = new FormData(form);

  const data = Object.fromEntries(fomData);

  const jsonData = JSON.stringify(data);
});

const inpEnrolled = document.getElementById("Enrolled");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const inpApply = document.getElementById("apply");
const movedButton = document.getElementById("moved");
const lostButton = document.getElementById("lost");

function handleButtonClick(btn, inpTarget) {
  btn.addEventListener("click", function () {
    const chosenValue = this.getAttribute("data-value");
    inpTarget.value = chosenValue;
  });
}

//step four get data
handleButtonClick(yesButton, inpEnrolled);
handleButtonClick(noButton, inpEnrolled);

//step five get data
handleButtonClick(movedButton, inpApply);
handleButtonClick(lostButton, inpApply);

// moveFromOneStepTwoAnother
const formSteps = [...form.querySelectorAll("[data-step]")];
const backButtonsHome = document.querySelectorAll("[data-previous-home]");
const btnsBack = document.querySelectorAll("[data-back]");
const allNextBtns = document.querySelectorAll("[data-next-skip]");

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("flex");
});

//handel backBtns
function backStep() {
  btnsBack.forEach((btnBack) => {
    btnBack.addEventListener("click", () => {
      if (currentStep > 0) {
        showCurrentStep("minus");
      }
    });
  });
}
backStep();

//handel nextBtns
function nextAction(btns) {
  Array.from(btns).map((btn) => {
    btn.addEventListener("click", () => {
      showCurrentStep("plus");
    });
  });
}
nextAction(allNextBtns);

function showCurrentStep(methode) {
  methode === "plus" ? (currentStep += 1) : (currentStep -= 1);
  let dirction = "";
  dirction = methode === "plus" ? "next" : "back";
  formSteps.forEach((step, index) => {
    if (index === currentStep) {
      step.classList.remove("hidden");
      step.classList.add("flex");

      // Focus on the first input field of the current step
      const firstInput = step.querySelector("input");
      if (firstInput) {
        firstInput.focus();
      }

      if (dirction === "back") {
        step.classList.add("animate-slide-prev");
      } else {
        step.classList.add("animate-slide-next");
      }

      setTimeout(() => {
        step.classList.remove("animate-slide-prev", "animate-slide-next");
      }, 500);
    } else {
      step.classList.remove("flex");
      step.classList.add("hidden");
    }
  });

  updateProgressBar();
  if (window.innerWidth <= 769) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}

// start progrees
const progress = document.querySelector("[data-progres]");
const progressBg = document.querySelector("[data-progress-bg]");
const totalSteps = formSteps.length - 1;
const stepWidth = 100 / totalSteps;

function updateProgressBar() {
  const progressWidth = stepWidth * currentStep;
  progress.innerHTML = `${progressWidth}%`;
  progressBg.style.cssText = `width: ${progressWidth}%; transition:0.3s ease-in-out`;
}

//setError
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('[error="error"]');

  errorDisplay.innerText = message;
  element.classList.remove("border-theard", "placeholder-theard");
  element.classList.add(
    "border-rose-300",
    "shadow-inputShadowError",
    "placeholder-rose-500"
  );
};

//setSucces
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('[error="error"]');
  errorDisplay.innerText = "";
  element.classList.remove("border-rose-300", "shadow-inputShadowError");
  element.classList.add("border-theard");
};

//step one
const stepOne = document.querySelector("#step1");
const summitButtonOne = stepOne.querySelector("[data-next]");
const zipInp = document.querySelector("#zip");

window.onload = function () {
  zipInp.focus();
};

summitButtonOne.addEventListener("click", function () {
  if (validateStepOne()) {
    showCurrentStep("plus");
  }

  zipInp.addEventListener("input", validateStepOne);
});

const validateStepOne = () => {
  let isValid = true;
  const zipValue = zipInp.value.trim();

  const zipRegex = /^\d{5}(-\d{4})?$/;

  if (!zipRegex.test(zipValue)) {
    setError(zipInp, "Enter a valid US ZIP code");
    isValid = false;
  } else {
    setSuccess(zipInp);
  }

  return isValid;
};

//step two
const stepTwo = document.querySelector("#step2");
const summitButtonTwo = stepTwo.querySelector("[data-next]");
const firstNameInp = document.querySelector("#firstName");
const lastNameInp = document.querySelector("#lastName");

summitButtonTwo.addEventListener("click", function () {
  if (validateStepTwo()) {
    showCurrentStep("plus");
  }

  firstNameInp.addEventListener("input", validateStepTwo);
  lastNameInp.addEventListener("input", validateStepTwo);
});

const validateStepTwo = () => {
  let isValid = true;
  const firstNameValue = firstNameInp.value.trim();
  const lastNameValue = lastNameInp.value.trim();

  const lettersRegex = /^[A-Za-z]+$/;

  if (firstNameValue === "" || !lettersRegex.test(firstNameValue)) {
    setError(firstNameInp, "First name is required ");
    isValid = false;
  } else {
    setSuccess(firstNameInp);
  }

  if (lastNameValue === "" || !lettersRegex.test(lastNameValue)) {
    setError(lastNameInp, "Last name is required ");
    isValid = false;
  } else {
    setSuccess(lastNameInp);
  }

  return isValid;
};

//step three
const stepThree = document.querySelector("#step3");
const summitButtonThree = stepThree.querySelector("[data-next]");
const monthInp = document.querySelector("#month");
const dayInp = document.querySelector("#day");
const yearInp = document.querySelector("#year");

monthInp.addEventListener("input", function () {
  if (monthInp.value.length == 2) {
    monthInp.blur();
    dayInp.focus();
  }
});

dayInp.addEventListener("input", function () {
  if (dayInp.value.length == 2) {
    dayInp.blur();
    yearInp.focus();
  }
});

function limetNumber(e, n) {
  if (e.target.value.length > n) {
    e.target.value = e.target.value.slice(0, n);
  }
}
function justNumber(e) {
  e.target.value = e.target.value.replace(/\D/g, "");
}

monthInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});
dayInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 2);
});
yearInp.addEventListener("input", function (e) {
  justNumber(e);
  limetNumber(e, 4);
});

summitButtonThree.addEventListener("click", function () {
  if (validateStepThree()) {
    showCurrentStep("plus");
  }

  monthInp.addEventListener("input", validateStepThree);
  dayInp.addEventListener("input", validateStepThree);
  yearInp.addEventListener("input", validateStepThree);
});

const validateStepThree = () => {
  let isValid = true;
  const monthValue = monthInp.value.trim();
  const dayValue = dayInp.value.trim();
  const yearValue = yearInp.value.trim();

  const numbersRegex = /^\d+$/;

  if (
    monthValue === "" ||
    !numbersRegex.test(monthValue) ||
    parseInt(monthValue) < 1 ||
    parseInt(monthValue) > 12
  ) {
    setError(monthInp, " valid (1-12)");
    isValid = false;
  } else {
    setSuccess(monthInp);
  }

  if (
    dayValue === "" ||
    !numbersRegex.test(dayValue) ||
    parseInt(dayValue) < 1 ||
    parseInt(dayValue) > 31
  ) {
    setError(dayInp, "valid (1-31)");
    isValid = false;
  } else {
    setSuccess(dayInp);
  }

  if (
    yearValue === "" ||
    !numbersRegex.test(yearValue) ||
    parseInt(yearValue) < 1900 ||
    parseInt(yearValue) > 2024
  ) {
    setError(yearInp, "Invalid year");
    isValid = false;
  } else {
    setSuccess(yearInp);
  }

  return isValid;
};
