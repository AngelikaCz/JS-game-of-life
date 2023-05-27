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
      row.className = "column";
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
    event.target.classList.toggle("alive");
    event.target.classList.toggle("dead");
  }
});

startStopButton.addEventListener("click", startGame);

function startGame() {
  const cells = document.querySelectorAll(".game-board .cell");
  // cells.forEach(verifyCells);
  // console.table(cells);
  saveInitalStatusBoard();
}

// function verifyCells(cell) {
//   if (cell.classList.contains("dead")) {
//     console.log(cell.id);
//     console.log(cell.id[0]);
//   }
// }

function saveInitialStatusColumn(passedColumn) {
  const state = [];
  const column = passedColumn;
  const cellsInColumn = column.children;
  for (let i = 0; i < cellsInColumn.length; i++) {
    if (cellsInColumn[i].classList.contains("dead")) {
      state.push(0);
    } else {
      state.push(1);
    }
  }
  return state;
}

// nie przeskakuje do kolejnej kolumny tylko zostaje w pierwszej
function saveInitalStatusBoard() {
  const boardState = [];
  const allColumns = gameBoard.children;
  for (let i = 0; i < allColumns.length; i++) {
    boardState.push(saveInitialStatusColumn(allColumns[i]));
    console.log(allColumns[i]);
  }
  console.log(boardState);
}

// trzeba spisać warunki dla każdej komórki, nie wyciągniesz z id jak będzie wieksze od 9
//   let top = cell.id[0] & cell.id[2]-1
//   let bottom = cell.id[0] & cell.id[2]+1
//   let left = cell.id[0]-1 & cell.id[2]
//   let right = cell.id[0]+1 cell.id[2]
//  let topRight = cell.id[0]+1 cell.id[2]-1
//  let bottomRight = cell.id[0]+1 cell.id[2]+1
//  let topLeft = cell.id[0]-1 cell.id[2]-1
//  let bottomLeft = cell.id[0]-1 cell.id[2]+1
