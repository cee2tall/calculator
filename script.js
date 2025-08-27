function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    alert("Error: Division by 0");
    resetCalc();
    return "";
  }
  return a / b;
}

function operate(left, right, operator) {
  let leftNum = +left,
    rightNum = +right,
    result;
  switch (operator) {
    case "+":
      result = add(leftNum, rightNum);
      break;
    case "-":
      result = subtract(leftNum, rightNum);
      break;
    case "x":
      result = multiply(leftNum, rightNum);
      break;
    case "/":
      result = divide(leftNum, rightNum);
      break;
  }
  if (result === "") {
    return result;
  }
  return Math.round((result + Number.EPSILON) * 1000) / 1000;
}

function resetCalc() {
  screen.innerText = "";
  currStage = 1;
}

function opButtonClicked(target) {
  if (operator !== undefined && lastClicked === 0) {
    screen.innerText = "" + operate(left, screen.innerText, operator);
  }
  left = screen.innerText;
  operator = target.innerText;
  currStage = 2;
  console.log(`left: ${left} and operator ${operator}`);
  lastClicked = 1;
}

function numButtonClicked(target) {
  if (currStage === 2) {
    screen.innerText = "";
    currStage = 1;
  }
  screen.innerText += target.innerText;
  lastClicked = 0;
}

function eraseButtonClicked() {
  if (screen.innerText.length > 0) {
    screen.innerText = screen.innerText.slice(0, -1);
  }
}

function equalsButtonClicked() {
  if (operator === undefined) {
    return;
  } else if (lastClicked === 0) {
    screen.innerText = "" + operate(left, screen.innerText, operator);
    currStage = 2;
  }
}

let lastClicked = 0; //0 for number, 1 for operator
let left = 0,
  right,
  operator;
let currStage = 1;
const screen = document.querySelector("#screen");
const smallButtons = document.querySelector("#small-buttons");
const bigButtons = document.querySelector("#big-buttons");

smallButtons.addEventListener("click", (event) => {
  let target = event.target;
  if (target.id === "small-buttons") {
    // User can click the div that contains all of the buttons, just return if they do
    return;
  } else if (target.id === "erase") {
    eraseButtonClicked();
  } else if (target.classList.contains("operator")) {
    opButtonClicked(target);
  } else {
    numButtonClicked(target);
  }
});

bigButtons.addEventListener("click", (event) => {
  let target = event.target;
  if (target.id === "clear") {
    resetCalc();
  } else if (target.id === "equals") {
    equalsButtonClicked();
  }
  operator = undefined;
});

// "5 + 10 * 10 - 10"
