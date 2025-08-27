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
  return a / b;
}

function operate(left, right, operator) {
  let leftNum = +left,
    rightNum = +right;
  switch (operator) {
    case "+":
      return add(leftNum, rightNum);
    case "-":
      return subtract(leftNum, rightNum);
    case "*":
      return multiply(leftNum, rightNum);
    case "/":
      return divide(leftNum, rightNum);
  }
}

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
    return;
  } else if (target.id === "erase") {
    if (screen.innerText.length > 0) {
      screen.innerText = screen.innerText.slice(0, -1);
    }
    return;
  } else if (target.classList.contains("operator")) {
    if (operator !== undefined) {
      screen.innerText = "" + operate(left, screen.innerText, operator);
    }
    left = screen.innerText;
    operator = target.innerText;
    currStage = 2;
    console.log(`left: ${left} and operator ${operator}`);

    return;
  } else {
    if (currStage === 2) {
      screen.innerText = "";
      currStage = 1;
    }
    screen.innerText += target.innerText;
  }
});

bigButtons.addEventListener("click", (event) => {
  let target = event.target;
  if (target.id === "clear") {
    screen.innerText = "";
    operator = undefined;
    currStage = 1;
  } else {
    screen.innerText = "" + operate(left, screen.innerText, operator);
  }
  operator = undefined;
});

// "5 + 10 * 10 - 10"
// "5 +(STAGE 2) 1(STAGE 3)0 * 10"
