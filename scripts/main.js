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

// function createBoard() {
//   const widthFromInputValue = widthFromInput.value;
//   const heightFromInputValue = heightFromInput.value;
//   if (widthFromInputValue > 0 && heightFromInputValue > 0) {
//     let idCol = 0;
//     let idCell = 0;
//     for (let i = 0; i < widthFromInputValue; i++) {
//       const row = document.createElement("div");
//       let board = document.querySelector(".game-board");
//       row.className = "column";
//       board.appendChild(row);
//       for (let j = 0; j < heightFromInputValue; j++) {
//         const column = document.createElement("div");
//         column.className = "cell dead";
//         column.setAttribute("id", `${idCol}-${idCell}`);
//         row.appendChild(column);
//         if (idCell === parseInt(heightFromInputValue) - 1) {
//           idCell = -1;
//         }
//         idCell++;
//       }
//       idCol++;
//     }
//   } else {
//     alert("Type in height and width for the board");
//   }
//   createBoardButton.innerHTML = "CLEAN BOARD";
// }

function createBoard() {
  const widthFromInputValue = widthFromInput.value;
  const heightFromInputValue = heightFromInput.value;
  if (widthFromInputValue > 0 && heightFromInputValue > 0) {
    let table = document.createElement("table");
    table.setAttribute("id", "game-board");
    for (let i = 0; i < heightFromInputValue; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < widthFromInputValue; j++) {
        let cell = document.createElement("td");
        cell.setAttribute("id", i + "-" + j);
        cell.setAttribute("class", "cell dead");
        cell.addEventListener("click", cellClick);
        tr.appendChild(cell);
      }
      table.appendChild(tr);
    }
    gameBoard.appendChild(table);
  } else {
    alert("Type in height and width for the board");
  }
  createBoardButton.innerHTML = "CLEAN BOARD";
}

function cleanBoard() {
  gameBoard.innerHTML = "";
  createBoardButton.innerHTML = "CREATE BOARD";
}

function cellClick() {
  let loc = this.id.split("-");
  let row = Number(loc[0]);
  let col = Number(loc[1]);
  if (this.className === "alive") {
    this.setAttribute("class", "dead");
  } else {
    this.setAttribute("class", "alive");
  }
}

// gameBoard.addEventListener("click", (event) => {
//   if (event.target.tagName === "td") {
//     event.target.classList.toggle("alive");
//     event.target.classList.toggle("dead");
//   }
// });

startStopButton.addEventListener("click", startGame);

function startGame() {
  startStopButton.innerHTML = "STOP";
  const cells = document.querySelectorAll(".game-board .cell");
  saveInitalStatusBoard();
  checkNeighbours();
  updateBoard(heightFromInput.value, widthFromInput.value);
}

function saveInitialStatusRow(passedRow) {
  const state = [];
  const row = passedRow;
  const cellsInRow = row.children;
  for (let i = 0; i < cellsInRow.length; i++) {
    if (cellsInRow[i].classList.contains("dead")) {
      state.push(0);
    } else {
      state.push(1);
    }
  }
  return state;
}

function saveInitalStatusBoard() {
  const boardState = [];
  const allRows = document.getElementsByTagName("tr");
  for (let i = 0; i < allRows.length; i++) {
    boardState.push(saveInitialStatusRow(allRows[i]));
  }
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
        boardState[x][y] = boardState[x][y];
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
      if (myCell === 1 && (sumNeighbours < 2 || sumNeighbours > 3)) {
        boardState[x][y] = 0;
      } else if (myCell === 0 && sumNeighbours === 3) {
        boardState[x][y] = 1;
      } else {
        boardState[x][y] = boardState[x][y];
      }
    }
  }
  console.table(boardState);
  return boardState;
}

function updateBoard(row, col) {
  let newBoardState = checkNeighbours();
  for (row in newBoardState) {
    for (col in newBoardState[row]) {
      let cell = document.getElementById(row + "-" + col);
      if (newBoardState[row][col] === 0) {
        cell.setAttribute("class", "cell dead");
      } else {
        cell.setAttribute("class", "cell alive");
      }
    }
  }
}
