document.addEventListener( 'DOMContentLoaded', function () { 
  let currentPage = 1;
// get the step content from the DOM
const infoChecked = document.querySelectorAll(".info-1");
const userInfo = document.querySelector(".user-info");
const buttons = document.querySelector(".buttons");
const stepContent = document.querySelectorAll(".step-content");
const back = document.getElementById("back");
const next = document.getElementById("next");

let storeValues = {
  name: "",
  email: "",
  phone: "",
  preferredPlan: "",
  preferredAddons: [],
};

function updateStep(stepNumber) {
  // toogle between the steps
  stepContent.forEach((content) => {
    content.classList.remove("active");
    if (parseInt(content.dataset.step) === stepNumber) {
      content.classList.add("active");
    }
  });

  back.style.display = stepNumber === 1 ? "none" : "block";
  next.style.display = stepNumber === 4 ? "none" : "block";

  infoChecked.forEach((step, index) => {
    console.log(index)
    if (index + 1 === stepNumber) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

// event listner for the next button
next.addEventListener("click", (e) => {
  if (validateForms()) {
    if (currentPage < 4) {
      e.preventDefault();
      currentPage++;
      updateStep(currentPage);

      if (currentPage === 2) {
        tooglePlans();
      }
      if (currentPage === 3) {
        toogleAddons();
      }
    }
  }
});

// button for the previous page
back.addEventListener("click", () => {
  if (currentPage > 1) {
    if (validateForms()) {
      currentPage--;
      updateStep(currentPage);
    }
  }
});

if (currentPage === 1) {
  back.style.display = "none";
  buttons.style.justifyContent = "right";
}

function validateForms() {
  let validate = true;

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone-number");

  // Remove previous error messages
  document.querySelectorAll(".error").forEach((el) => el.remove());

  // Helper function to show error
  function showError(input, message) {
    const error = document.createElement("p");
    error.style.color = "red";
    error.style.margin = 0;
    error.classList.add("error");
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
  }

  // Name validation
  if (name.value.trim() === "") {
    showError(name, "Name is required");
    validate = false;
  }

  // Email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    showError(email, "Email is required");
    validate = false;
  } else if (!regex.test(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    validate = false;
  }

  // Phone validation
  if (phone.value.trim() === "") {
    showError(phone, "Phone number is required");
    validate = false;
  } else if (phone.value.trim().length < 8) {
    showError(phone, "Phone number must be at least 8 characters");
    validate = false;
  }

  if (validate) {
    storeValues.name = name.value.trim();
    storeValues.email = email.value.trim();
    storeValues.phone = phone.value.trim();

    localStorage.setItem('userInformation', JSON.stringify(storeValues));
  }

  return validate;
}

function tooglePlans() {
  const planContainer = document.querySelectorAll(".contain");

  planContainer.forEach((planSelected) => {
    if (planSelected.classList.contains("active")) {
      storeValues.preferredPlan = planSelected.dataset.plan;
      localStorage.setItem("userInformation", JSON.stringify(storeValues));
    }

    planSelected.addEventListener("click", () => {
      planContainer.forEach((element) => element.classList.remove("active"));
      planSelected.classList.add("active");

      storeValues.preferredPlan = planSelected.dataset.plan;

      localStorage.setItem("userInformation", JSON.stringify(storeValues));
    });

  });
}

function toogleAddons() {
  const pickAddons = document.querySelectorAll('input[name="pick-addons"]');
  pickAddons.forEach((plan) => {

    const parent = plan.closest(".pick-content");
    let addonValue = parent.dataset.addon;

    if (parent.classList.contains("active")) {
      if (!storeValues.preferredAddons.includes(addonValue)) {
        storeValues.preferredAddons.push(addonValue);
        localStorage.setItem("userInformation", JSON.stringify(storeValues));
      }
    }

    plan.addEventListener("change", function () {
      if (plan.checked) {
        parent.classList.add("active");
        if (!storeValues.preferredAddons.includes(addonValue)) {
          storeValues.preferredAddons.push(addonValue);
        }
      } else {
        parent.classList.remove("active");
        storeValues.preferredAddons = storeValues.preferredAddons.filter(
          (item) => item !== addonValue
        );
      }

      localStorage.setItem("userInformation", JSON.stringify(storeValues));

    });
  });
}

if(window.innerWidth <= 540) {
  document.querySelector('svg').style.display = 'none'
  const image = document.querySelectorAll('.contain')
  image.forEach((element) => {
    let secondElement = element.querySelector('h6')
    const container = document.createElement('div')
    container.append(secondElement, element.lastElementChild)
    element.insertAdjacentElement('beforeend', container)
  })
}
})