const widthFromInput = document.querySelector(".width");
const heightFromInput = document.querySelector(".height");
const startStopButton = document.querySelector(".start-stop-button");
const createBoardButton = document.querySelector(".create-board-button");

createBoardButton.addEventListener("click", createBoard);
// startStopButton.addEventListener("click", startGame);

function createBoard() {
  const widthFromInputValue = widthFromInput.value;
  const heightFromInputValue = heightFromInput.value;
  for (let i = 0; i < widthFromInputValue; i++) {
    const row = document.createElement("div");
    let board = document.querySelector(".game-board");
    board.appendChild(row);
    row.className = "row";
    for (let j = 0; j < heightFromInputValue; j++) {
      const column = document.createElement("div");
      column.className = "column";
      row.appendChild(column);
    }
  }
  // board za każdym kliknieciem się powieksza, moze klasa? Zmiana przycisku na clean board?
}

// function startGame() {}
