const widthFromInput = document.querySelector(".width");
const heightFromInput = document.querySelector(".height");
const startStopButton = document.querySelector(".start-stop-button");
const createBoardButton = document.querySelector(".create-board-button");
const gameBoard = document.querySelector(".game-board");
let createBoardButtonOn = false;

createBoardButton.addEventListener("click", () => {
  createBoardButtonOn = !createBoardButtonOn;

  if (createBoardButtonOn) createBoard();
  else cleanBoard();
});

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
}

function cleanBoard() {
  gameBoard.innerHTML = "";
  createBoardButton.innerHTML = "CREATE BOARD";
}

gameBoard.addEventListener("click", (event) => {
  if (event.target.tagName === "DIV") {
    console.log(event.target);
    event.target.classList.toggle("alive");
    event.target.classList.toggle("dead");
  }
});

// funkcja do policzenia ile jest komórek na planszy?
// function countCells() {}

startStopButton.addEventListener("click", startGame);

function startGame() {
  const cells = document.querySelectorAll(".game-board .cell");
  cells.forEach((cell) => console.log(cell.id));
}

function verifyCells() {
  // trzeba spisać warunki dla każdej komórki
  //   let top = cell.id[0] & cell.id[2]-1
  //   let bottom = cell.id[0] & cell.id[2]+1
  //   let left = cell.id[0]-1 & cell.id[2]
  //   let right = cell.id[0]+1 cell.id[2]
  //  let topRight = cell.id[0]+1 cell.id[2]-1
  //  let bottomRight = cell.id[0]+1 cell.id[2]+1
  //  let topLeft = cell.id[0]-1 cell.id[2]-1
  //  let bottomLeft = cell.id[0]-1 cell.id[2]+1
}

//można moze rozbić na 2 funkcje, rob cos jesli jest alive, rob coś jesli jest dead/ Dodatkowy warunek krawędziowy? Nie sprawdzaj?
