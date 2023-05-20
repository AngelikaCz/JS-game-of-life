const widthFromInput = document.querySelector(".width");
const heightFromInput = document.querySelector(".height");
const startStopButton = document.querySelector(".start-stop-button");
const createBoardButton = document.querySelector(".create-board-button");
// const selectedCell = document.querySelector(".cell");

createBoardButton.addEventListener("click", createBoard);
// startStopButton.addEventListener("click", startGame);

function createBoard() {
  const widthFromInputValue = widthFromInput.value;
  const heightFromInputValue = heightFromInput.value;
  if (widthFromInputValue > 0 && heightFromInputValue > 0) {
    let idRow = 1;
    let idCell = 1;
    for (let i = 0; i < widthFromInputValue; i++) {
      const row = document.createElement("div");
      let board = document.querySelector(".game-board");
      row.setAttribute("id", `${idRow} - ${idCell}`);
      row.className = "row";
      idRow++;
      board.appendChild(row);
      for (let j = 0; j < heightFromInputValue; j++) {
        const column = document.createElement("div");
        column.className = "cell dead";
        // column.setAttribute("id", `${idCell}`);
        idCell++;
        row.appendChild(column);
      }
    }
  } else {
    alert("Type in height and width for the board");
  }
  // board za każdym kliknieciem się powieksza, moze klasa? Zmiana przycisku na clean board?
}

// function startGame() {}

// selectedCell.addEventListener("click", changeColor);

// function changeColor() {
//   selectedCell.classList.add("alive");
// }
