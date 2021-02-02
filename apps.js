const gridContainer = document.getElementById("grid-container");
const clearButton = document.querySelector("#clear");
const sizeInput = document.querySelector("#range");
const sizeSpan = document.querySelector("#size-span");
const colorInput = document.querySelector("#color");
const colorOptionButtons = document.querySelectorAll('input[name="color"]');
const rainbowRadio = document.querySelector("#rainbow-radio");
const pickerRadio = document.querySelector("#picker-radio");

let size = sizeInput.value;
let color = colorInput.value;
let colorOption = document.querySelector("input[name=color]:checked").value;
sizeSpan.textContent = size;
makeGrid();

clearButton.addEventListener("click", makeGrid);
sizeInput.addEventListener("change", changeGridSize);
colorInput.addEventListener("input", changePenColor);
colorOptionButtons.forEach((button) =>
  button.addEventListener("click", changeColorOption)
);

function makeGrid() {
  removePreviousGrid();
  createNewGrid();
  addEffectToItems();
}

function removePreviousGrid() {
  const gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach((item) => item.remove());
}

function createNewGrid() {
  document.documentElement.style.setProperty("--grid-size", size);

  for (let n = 0; n < size * size; n++) {
    let cell = document.createElement("div");
    gridContainer.appendChild(cell).className = "grid-item";
  }
}

function addEffectToItems() {
  const gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach((item) =>
    item.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = selectColor();
    })
  );
}

function selectColor() {
  if (colorOption === "picker") {
    return color;
  } else {
    return getRandomColor();
  }
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeGridSize() {
  size = sizeInput.value;
  sizeSpan.textContent = size;
  makeGrid();
}

function changePenColor() {
  pickerRadio.checked = true;
  colorOption = pickerRadio.value;

  color = colorInput.value;
  addEffectToItems();
}

function changeColorOption(e) {
  colorOption = e.target.value;
}
