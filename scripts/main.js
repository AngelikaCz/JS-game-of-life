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
  startStopButton.innerHTML = "STOP";
  const cells = document.querySelectorAll(".game-board .cell");
  saveInitalStatusBoard();
  checkNeighbours();
}

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

function saveInitalStatusBoard() {
  const boardState = [];
  const allColumns = gameBoard.children;
  for (let i = 0; i < allColumns.length; i++) {
    boardState.push(saveInitialStatusColumn(allColumns[i]));
  }
  console.log(boardState);
  return boardState;
}

function checkNeighbours() {
  let boardState = saveInitalStatusBoard();
  for (let x = 0; x < widthFromInput.value; x++) {
    for (let y = 0; y < heightFromInput.value; y++) {
      // wyeliminuj brzegi
      if (
        x === 0 ||
        x === widthFromInput.value - 1 ||
        y === 0 ||
        y === heightFromInput.value - 1
      ) {
        continue;
      }
      let myCell = boardState[x][y];
      let top = boardState[x - 1][y];
      let bottom = boardState[x + 1][y];
      let right = boardState[x][y + 1];
      let left = boardState[x][y - 1];
      let topRight = boardState[x - 1][y + 1];
      let bottomRight = boardState[x + 1][y + 1];
      let topLeft = boardState[x - 1][y - 1];
      let bottomLeft = boardState[x + 1][y - 1];
      let sumNeighbours =
        top +
        bottom +
        right +
        left +
        topRight +
        bottomRight +
        topLeft +
        bottomLeft;

      if ((myCell === 1 && sumNeighbours < 2) || sumNeighbours > 3) {
        boardState[x][y] = 0;
      }

      if (myCell === 0 && sumNeighbours === 3) {
        boardState[x][y] = 1;
      }
    }
  }
  let newBoardState = boardState;
  console.log(newBoardState);
  return newBoardState;
}
