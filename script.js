console.log("Tester");

//Global variables : current value, increment value
let cookieCount = 0;
let cookiesPerSecond = 1;

//Getting the Upgrades from the API
async function getUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  console.log(response);
  const upgrades = await response.json();
  console.log(upgrades);

  return upgrades;
}
//The div that will contain all the Upgrade divs - much easier to position divs
const upgradesContainer = document.getElementById("upgrades-container");

//Creating the divs for each individual upgrade
function createUpgradeDivs() {
  const newDiv = document.createElement("div");
  newDiv.className = "upgrade-item";
  return newDiv;
}
//Function to create the upgrades using data from the API
function createUpgrades(name, cost, increase) {
  const newDiv = createUpgradeDivs();
  const amount = document.createElement("div");
  const upgradeName = document.createElement("div");
  const upgradeCost = document.createElement("div");
  const upgradeIncrease = document.createElement("div");
  const buyButton = document.createElement("button");

  //Assigning text content and class names to make it easier to style later
  amount.textContent = 0;
  amount.className = "amount";
  upgradeName.textContent = name;
  upgradeName.className = "upgrade-name";
  upgradeCost.textContent = cost;
  upgradeCost.className = "upgrade-cost";
  upgradeIncrease.textContent = increase;
  upgradeIncrease.className = "upgrade-increase";
  buyButton.textContent = "Buy";
  buyButton.className = "buy-button";

  upgradesContainer.appendChild(newDiv);
  newDiv.appendChild(amount);
  newDiv.appendChild(upgradeName);
  newDiv.appendChild(upgradeCost);
  newDiv.appendChild(upgradeIncrease);
  newDiv.appendChild(buyButton);
}

//Displaying the upgrades on the screen
async function displayUpgrades() {
  const upgradesData = await getUpgrades();

  upgradesData.forEach((upgrade) => {
    createUpgradeDivs();
    createUpgrades(upgrade.name, upgrade.cost, upgrade.increase);
  });
}
const cookieNumber = document.getElementById("number-of-cookies");
const cookieIncrement = document.getElementById("cookies-per-second");

cookieNumber.textContent = cookieCount;
cookieIncrement.textContent = cookiesPerSecond;

displayUpgrades();
