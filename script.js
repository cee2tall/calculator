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
  switch (operator) {
    case "+":
      return add(left, right);
    case "-":
      return subtract(left, right);
    case "*":
      return multiply(left, right);
    case "/":
      return divide(left, right);
  }
}

// const numberButtons = document.querySelectorAll(".number");
// numberButtons.array.forEach((element) => {});

const screen = document.querySelector("#screen");
const smallButtons = document.querySelector("#small-buttons");
smallButtons.addEventListener("click", (event) => {
  let target = event.target;
  if (target.id === "small-buttons") {
    return;
  }
  screen.innerText += target.innerText;
});

let left, right, operator;
