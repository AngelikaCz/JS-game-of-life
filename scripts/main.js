const widthFromInput = document.querySelector(".width");
const heightFromInput = document.querySelector(".height");
const startStopButton = document.querySelector(".start-stop-button");
const createBoardButton = document.querySelector(".create-board-button");
const gameBoard = document.querySelector(".game-board");
let createBoardButtonOn = false;
// const selectedCell = document.querySelector(".cell");

createBoardButton.addEventListener("click", () => {
  createBoardButtonOn = !createBoardButtonOn;

  if (createBoardButtonOn) createBoard();
  else cleanBoard();
});

// startStopButton.addEventListener("click", startGame);

function createBoard() {
  const widthFromInputValue = widthFromInput.value;
  const heightFromInputValue = heightFromInput.value;
  if (widthFromInputValue > 0 && heightFromInputValue > 0) {
    let idRow = 0;
    let idCell = 1;
    for (let i = 0; i < widthFromInputValue; i++) {
      const row = document.createElement("div");
      let board = document.querySelector(".game-board");
      row.className = "row";
      idRow++;
      board.appendChild(row);
      for (let j = 0; j < heightFromInputValue; j++) {
        const column = document.createElement("div");
        column.className = "cell dead";
        column.setAttribute("id", `${idRow}-${idCell}`);
        row.appendChild(column);
        if (idCell === parseInt(heightFromInputValue)) {
          idCell = 0;
        }
        idCell++;
      }
    }
  } else {
    alert("Type in height and width for the board");
  }

  createBoardButton.innerHTML = "CLEAN BOARD";
  // board za każdym kliknieciem się powieksza, moze klasa? Zmiana przycisku na clean board?
}

function cleanBoard() {
  gameBoard.innerHTML = "";
  createBoardButton.innerHTML = "CREATE BOARD";
}

// function startGame() {}

// selectedCell.addEventListener("click", changeColor);

// function changeColor() {
//   selectedCell.classList.add("alive");
// }
