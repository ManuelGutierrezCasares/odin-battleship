// document.getElementById('player-1').style.webkitTransform += "rotate(180deg)"

export const display = (player1, player2) => {
  createBoard(1);
  createBoard(2);
};

export const updateBoard = (board, id) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      document.querySelector(`#player-${id} #cell-${i}${j}`).textContent = board[i][j];
    }
  }
};

const createBoard = (id) => {
  const board1 = document.getElementById(`player-${id}`);

  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.id = `cell-${i}${j}`;
      cell.style.width = '30px';
      cell.style.height = '30px';
      cell.style.border = 'solid 1px black';
      row.prepend(cell);
    }
    board1.appendChild(row);
  }
  board1.style.margin = '30px';
};
