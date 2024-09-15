console.log("Tester");

//Variable initialisation
let cookieCount = 0;
//!There were too many things changing this one variable to keep track of. I am going to make the value returned  from a function instead. The reset button was changing it and all the buy buttons too any then it randomly crashed ✅
let cookiesPerSecond = 0;

const cookieNumber = document.getElementById("number-of-cookies");
const cookieIncrement = document.getElementById("cookies-per-second");
const resetButton = document.getElementById("reset");
//Sounds
const cookieButton = document.getElementById("cookie");
const cookieCrunch = new Audio("./Media/cookie-crunch.mp4");
const incorrect = new Audio("./Media/Incorrect.mp4");
const kerching = new Audio("./Media/Kerching.mp4");
const error = document.getElementById("error-message");
const cookieToggle = document.getElementById("cookie-toggle");
const muteButton = document.getElementById("muted");
const muteIcon = document.getElementById("muted-icon");
let mute = false;
let currentCookie = 0;
let purchasedItems = []; //!When looking at the local storage of the example i saw that they had a purchased items array. this actually really helped me a lot with updating my cookies per second count as i just traversed the array of objects and added all the increases ✅
let upgradePushDecider = true;
let cookieImageArray = [
  "./Media/jammieDodger.png",
  "./Media/Cookie.png",
  "./Media/doubleChocolate.png",
  "./Media/heartCookie.png",
  "./Media/Oreo.png",
  "./Media/cracker.png",
  "./Media/Smore.png",
  "./Media/strawberryCookie.png",
  "./Media/fortuneCookie.png",
  "./Media/macaron.png",
];

//For my reference because i'm losing track of the function names 😭
function functionGlossary() {
  getUpgrades(); //Gets the upgrades from the API
  createUpgradesFailed(); //NOT IN USE! NEVER CALLED!
  //My first attempt at creating the upgrades. Displayed well however i had a lot of issues retreiving data from the API that i needed and i didn't want to copy and paste the entire array locally
  createUpgrades(); //creates the upgrades, displays them on screen and creates the buttons and event handlers for them
  //!This was the hardest function to write and took me the longest time
  cookieButtonClick(); //Event handler for when the cookie is clicked
  eachIncrement(); //Updates cookiesPersecond and cookieCount on-screen
  getLocal(); //Gets the value from local storage
  setLocal(); //Sets the value in local storage
  reset(); //Resets the purchased items, cookieCount and cookies per second. Updates the local storage and on-screen upgrades
  updateAmounts(upgrade); //Calculates the amount for the upgrade
  updateCookiesPerSecond(); //Updates the cookies per second value
  enoughCookies(upgrade); //Checks if there are enough cookies to buy an upgrade
  pushUpgrades(upgrade, cookieCost); //Decides whether or not to push the upgrades to the purchased items array
  subtractCookies(cookieCost); //subtracts the cookies cost of an upgrade from the cookie count
  muteSound(); //Mutes or unmutes the sound
  changeCookie(); //changed the cookie when cookie toggle is clicked
  startUp(); //Calls the fucntions required for the start up
  functionGlossary(); //NOT IN USE! NEVER CALLED!
}

//Getting the Upgrades from the API
async function getUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  // console.log(response);
  const upgrades = await response.json();
  // console.log(upgrades);

  return upgrades;
}
//The div that will contain all the Upgrade divs - much easier to position divs

//!This keeps new divs to the page 😭 i need to overwrite the html each time it refreshes instead : innerHTML
//!It's a lot easier to just write over the data because i don't want to have to store the data from  the API locally. This main function wrangles my data for me. Each refresh will overwrite previous data and retrieve the continuous aspects from local storage ✅

async function createUpgradesFailed() {
  const upgradesContainer = document.getElementById("upgrades-container");
  const upgradesData = await getUpgrades();

  upgradesContainer.innerHTML = "";

  upgradesData.forEach((upgrade) => {
    const newDiv = document.createElement("div");
    const buyButton = document.createElement("button");
    //const cookieBite = document.createElement("i");
    const cookie = document.createElement("i");

    //Assigning text content and class names to make it easier to style later
    newDiv.className = "upgrade-item";
    cookieBite.className = "fa-solid fa-cookie-bite";
    cookie.className = "fa-solid fa-cookie";
    amount.textContent = updateAmounts(upgrade.name);
    amount.className = "amount";
    upgradeName.textContent = upgrade.name;
    upgradeName.className = "upgrade-name";
    upgradeCost.textContent = upgrade.cost;
    upgradeCost.className = "upgrade-cost";
    upgradeIncrease.textContent = upgrade.increase;
    upgradeIncrease.className = "upgrade-increase";
    buyButton.textContent = "BUY ";
    buyButton.className = "buy-button";

    upgradesContainer.appendChild(newDiv);
    newDiv.appendChild(amount);
    newDiv.appendChild(upgradeName);
    newDiv.appendChild(upgradeCost);
    newDiv.appendChild(upgradeIncrease);

    upgradeCost.appendChild(cookieBite);
    buyButton.appendChild(cookie);

    buyButton.addEventListener("click", () => {
      enoughCookies(upgrade),
        purchasedItems.push(upgrade),
        setLocal(),
        getLocal(),
        createUpgrades();
    });
    newDiv.appendChild(buyButton);
  });
}

//Function to create and display the upgrades using data from the API
async function createUpgrades() {
  const upgradesContainer = document.getElementById("upgrades-container");
  const upgradesData = await getUpgrades();

  upgradesContainer.innerHTML = "";
  //Going to add the text as in HTML
  upgradesData.forEach((upgrade) => {
    const newDiv = document.createElement("div");
    newDiv.className = "upgrade-item";
    const buyButton = document.createElement("button");

    //Assigning text content and class names to make it easier to style later
    //It is a lot easier to overwrite my own html each time
    newDiv.innerHTML = `
      <div class="amount">${updateAmounts(upgrade.name)}</div>
      <div class="upgrade-name">${upgrade.name}</div>
      <div class="upgrade-cost">${
        upgrade.cost
      } <i class="fa-solid fa-cookie-bite"></i> </div>
      <div class="upgrade-increase"><i class="fa-solid fa-plus">  ${
        upgrade.increase
      } </div>`;

    buyButton.innerHTML = `BUY <i class="fa-solid fa-cookie"></i>`;
    buyButton.className = "buy-button";
    //In an anonymous function because i can access the data retrieved from the API above easier
    buyButton.addEventListener("click", () => {
      enoughCookies(upgrade);
      //purchasedItems.push(upgrade);
      pushUpgrades(upgrade, upgrade.cost);
      setLocal();
      createUpgrades();
      eachIncrement();
      //Each 'buybutton' checks if :
      //there are enough cookies for the upgrade
      //Use the push upgrade button to decide whether the updgrade will be added to the bought items and subtracts if bought
      //Updates the local value when pushed
      //Updates the upgrades
      //Updates the cooukie count on screen
    });
    newDiv.appendChild(buyButton);
    upgradesContainer.appendChild(newDiv);
  });
}

//!I was struggling to do this way because i would have had to create an event handler and function for each peice of data from the API which would have been cumbersome. I tried adding the event clickers as one in the for loop instead so i don't have to repeat myself 10 times ✅
// //Displaying the upgrades on the screen
// async function displayUpgrades() {
//   const upgradesData = await getUpgrades();

//   upgradesData.forEach((upgrade) => {
//     createUpgradeDivs();
//     createUpgrades(upgrade);
//   });
// }

function cookieButtonClick() {
  eachIncrement();
  setLocal();
  cookieCrunch.play();
}

function eachIncrement() {
  cookiesPerSecond = updateCookiesPerSecond();
  cookieCount += cookiesPerSecond;
  cookieIncrement.innerHTML = `${cookiesPerSecond} Cookie(s)/sec`;
  cookieNumber.innerHTML = cookieCount;

  setLocal();
  console.log("nom🍪");
}
//Local Storage Get Items
function getLocal() {
  //!cookieCount = localStorage.getItem("cookies"); //Geting the previous cookies value from local storage
  cookieCount = parseInt(localStorage.getItem("cookies")) || 0; //Geting the previous cookies value from local storage
  //if no previous data get 0 for cookieCount and currrent cookie and empty array
  console.log(cookieCount);
  //!I had to parse the data retrived as an integer because when refreshed, it was returned as string which messed everything up
  //!I used the console.log(type of ) to debug this issue ✅
  console.log(typeof localStorage.getItem("cookies"));
  purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
  console.log(purchasedItems);
  currentCookie = parseInt(localStorage.getItem("cookieImage")) || 0;
  console.log(purchasedItems);
}
//Local Storage Set Items
function setLocal() {
  localStorage.setItem("cookies", cookieCount);
  localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  localStorage.setItem("cookieImage", currentCookie);
}

//Reset function
function reset() {
  cookieCount = 0;
  // cookies per second sorted out by updateCookiesPerSecond() function called in each increment
  purchasedItems = [];
  currentCookie = 0; //Changes to cookie image to default settings
  eachIncrement();
  //Local storage set items
  setLocal();
  createUpgrades(); //Refresh items to reset values
  cookie.src = cookieImageArray[currentCookie];
}

//Update amounts
function updateAmounts(upgrade) {
  //All the upgrade amounts will start at 0;
  let amount = 0;
  //It is going to compare the names of the upgrades in the HTML to the names of the data in the purchased items array and upgrade the amount value as necessary
  for (item of purchasedItems) {
    if (item.name === upgrade) {
      amount++;
      // console.log(amount);
    }
  }
  return amount;
}

//Will update the cookies per second value by getting the looking at the items in the purchased items array and adding their value to the cookies per second
function updateCookiesPerSecond() {
  let cookiesPerSecond = 1;
  for (item of purchasedItems) {
    cookiesPerSecond += item.increase;
  }
  return cookiesPerSecond;
}

//!Stretch Goal
//Checking if there is enough cookies
//Using my week one splach page button as reference because that worked well
//I need to pass the upgrade object as a parameter which is wrangled in my createUpdatesFunction()
//stop amount from updating if there are insufficient ccookies
function enoughCookies(upgrade) {
  console.log(upgradePushDecider);
  if (cookieCount <= upgrade.cost) {
    error.style.display = "block";
    incorrect.play();
    document.body.style.backgroundColor = "rgba(255, 41, 41, 0.56)";
    upgradePushDecider = false;
    console.log(upgradePushDecider);
    //Display set to "none" after 5 seconds and upgrade push decider = true
    setTimeout(() => {
      error.style.display = "none";
      document.body.style.backgroundColor = "#80cbc4";
    }, 3000);
  }
}

function pushUpgrades(upgrade, cookieCost) {
  if (upgradePushDecider === false) {
    console.log("No upgrade");
  } else {
    console.log("Yay upgrades!");
    purchasedItems.push(upgrade);
    cookieIncrement.style.color = "#3aa61e";
    cookieIncrement.style.fontWeight = 600;
    document.body.style.backgroundColor = "rgba(41, 255,107, 0.56)";
    setTimeout(() => {
      //removes styles after 5 seconds
      cookieIncrement.style.color = null;
      cookieIncrement.style.fontWeight = null;
      document.body.style.backgroundColor = "#80cbc4";
    }, 3000);
    subtractCookies(cookieCost);
    kerching.play();
  }
  upgradePushDecider = true; //return to default
  console.log(`Default : ${upgradePushDecider}`);
}

//subtracting the cookies when clicked
function subtractCookies(cookieCost) {
  cookieCount -= cookieCost;
}

function muteSound() {
  if (mute == false) {
    muteIcon.className = "fa-solid fa-volume-xmark";
    cookieCrunch.muted = true;
    kerching.muted = true;
    incorrect.muted = true;
    mute = true;
  } else {
    muteIcon.className = "fa-solid fa-volume-high";
    cookieCrunch.muted = false;
    kerching.muted = false;
    incorrect.muted = false;
    mute = false;
  }
}
function changeCookie() {
  console.log(currentCookie);
  if (currentCookie >= cookieImageArray.length - 1) {
    currentCookie = 0;
  } else {
    currentCookie++;
  }
  cookie.src = cookieImageArray[currentCookie];
}

//Upon startup, i want these functions to run: createUpgrades
function startUp() {
  getLocal(); //Get the data from the local storage
  //This sets the cookieCount to the value in local storage
  console.log(cookieCount);
  setInterval(() => {
    eachIncrement();
  }, 1000);
  createUpgrades(); //Create and display the upgrades container
  cookie.src = cookieImageArray[currentCookie]; //Changes to cookie user chose beforehand
}

//Event Listeners
resetButton.addEventListener("click", reset);
cookieButton.addEventListener("click", cookieButtonClick);
muteButton.addEventListener("click", muteSound);
cookieToggle.addEventListener("click", changeCookie);
//Function calls
startUp();
console.log(getUpgrades());

//!Refreshing the page is were everything goes south. It fetches the data from local storage but them it doesn't increment correctly. It just keeps adding the number to the end of the cookie count ✅

//!When I refreshed the page, the value were adding on to the end like a string rather than adding and incrementing the value like a number. To fix this, when i got the data from the local storage, i parsed it as an integer which then fixed the problem 🥳 (line 145) ✅
