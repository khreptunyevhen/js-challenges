const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const resultBtn = document.querySelector("[data-result]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const previousOutputEl = document.querySelector(".previous-value");
const currentOutputEl = document.querySelector(".current-value");

let operation;

function clear() {
  previousOutputEl.textContent = "";
  currentOutputEl.textContent = "";
}

function typeNumber(number) {
  if (number === "." && currentOutputEl.textContent.includes(".")) return;

  if (number === "0" && currentOutputEl.textContent === "0") {
    return;
  }

  currentOutputEl.textContent += number;
}

function compute(operation) {
  let computation;
  const prev = parseFloat(previousOutputEl.textContent);
  const curr = parseFloat(currentOutputEl.textContent);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "÷":
      computation = prev / curr;
      break;
    case "×":
      computation = prev * curr;
      break;
    default:
      return;
  }

  previousOutputEl.textContent = "";
  currentOutputEl.textContent = computation;
}

numberBtns.forEach((button) => {
  const value = button.textContent;

  button.addEventListener("click", () => typeNumber(value));
});

operationBtns.forEach((button) => {
  const value = button.textContent;

  button.addEventListener("click", () => {
    if (currentOutputEl.textContent === "" && value === "-") {
      currentOutputEl.textContent = "-";
      return;
    }

    if (currentOutputEl.textContent === "") return;

    if (previousOutputEl.textContent !== "") compute(value);

    previousOutputEl.textContent = `${currentOutputEl.textContent} ${value}`;
    currentOutputEl.textContent = "";

    operation = value;
  });
});

clearBtn.addEventListener("click", clear);
resultBtn.addEventListener("click", () => compute(operation));
deleteBtn.addEventListener("click", () => {
  currentOutputEl.textContent = currentOutputEl.textContent.slice(0, -1);
});
