function createBoard() {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    let board = document.querySelector(".game-board");
    board.appendChild(row);
    row.className = "row";
    for (let j = 0; j < 10; j++) {
      const column = document.createElement("div");
      column.className = "column";
      row.appendChild(column);
    }
  }
}

createBoard();
