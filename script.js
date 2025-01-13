const infoChecked = document.querySelectorAll(".info-1");
const userInfo = document.querySelector(".user-info");

// const changeInfo = () => {
const steps = {
  step2: {
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing",
    icon: [
      {
        icon: "../../images/icon-advanced.svg",
        name: "Arcade",
        price: "$9/mo",
      },
      {
        icon: "../../images/icon-advanced.svg",
        name: "Advanced",
        price: "$12/mo",
      },
      {
        icon: "../../images/icon-advanced.svg",
        name: "Pro",
        price: "$15/mo",
      },
    ],
    duration: "Monthly, Yearly",
    back: "Go back",
    next: "Next step",
  },
  step3: {
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience",
    addOns: [
      {
        subTitle: "Online service",
        paragraph: "Access to multiplayer games",
        price: "+$1/mo",
      },
      {
        subTitle: "Larger Storage",
        paragraph: "Extra 1TB of clous save",
        price: "+$2/mo",
      },
      {
        subTitle: "Customizable profile",
        paragraph: "Custom them on your profile",
        price: "+$2/mo",
      },
    ],
    back: "Go back",
    next: "Next step",
  },
  step4: {
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming",
  },
};
// };
const selectId = () => {
  infoChecked.forEach((item) => {
    item.addEventListener("click", () => {
      const stepID = item.id;
      console.log(stepID);

      infoChecked.forEach((s) => s.classList.remove("active"));
      item.classList.add("active");

      console.log(steps[stepID]);

      let content = ''
      if (steps[stepID].icon) {
        content = steps[stepID].icon.map((ico) => (
            `<div>
            <img src={'${ico.icon}'}/>
            <h3>${ico.name}</h3>
            <p>${ico.price}</p>
            </div>
            `
        ).join(''))
      }
      if (steps[stepID]) {
        userInfo.innerHTML = `
            <div>
                <h1>${steps[stepID].title}</h1>
                <p>${steps[stepID].description}</p>
                <div>
                <div>
                ${content}
                </div>
                </div>
            </div>
        `;
      }
    });
  });
};
selectId();
