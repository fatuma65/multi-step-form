let currentPage = 1;
// get the step content from the dom
const infoChecked = document.querySelectorAll(".info-1");
const userInfo = document.querySelector(".user-info");
const buttons = document.querySelector(".buttons");
const stepContent = document.querySelectorAll(".step-content");
const back = document.getElementById("back");
const next = document.getElementById("next");
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
    if (index + 1 <= stepNumber) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

// event listner for the next button
next.addEventListener("click", () => {
  if (currentPage < 4) {
    currentPage++;
    updateStep(currentPage);
  }
});

// button for the previous page
back.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateStep(currentPage);
  }
});

if (currentPage === 1) {
  back.style.display = 'none'
  buttons.style.justifyContent = 'right'
}