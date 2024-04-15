import { checkIfGameEnded } from './game.js';
import { getCoordinatesFromTagId, SHIP_TYPES } from './helpers.js';
import { createShipsPreview, createGameInstructions, dragoverHandler, dropHandler } from './draganddrop.js';

export const display = (game) => {
  createShipsPreview(SHIP_TYPES);
  createGameInstructions();
  alert('PLACE YOUR SHIPS ON YOUR BOARD');
  createBoard(1, game);
  createBoard(2, game);
};

export const updateBoard = (board, ships, id) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.querySelector(`#player-${id}-cell-${i}${j}`);
      // cell.textContent = board[i][j];
      if (id === 1) {
        if (board[i][j] === 'o') cell.style.backgroundColor = 'white';
        if (board[i][j] === 's') cell.style.backgroundColor = 'blue';
        if (board[i][j] === 'm') cell.style.backgroundColor = 'grey';
        if (board[i][j] === 'x') {
          cell.style.border = 'purple';
          cell.style.backgroundColor = 'orange';
        };
        // if (cell.textContent === 'o') cell.style.backgroundColor = 'white';
        // if (cell.textContent === 's') cell.style.backgroundColor = 'blue';
        // if (cell.textContent === 'm') cell.style.backgroundColor = 'red';
        // if (cell.textContent === 'x') cell.style.backgroundColor = 'green';
      }
      colorSunkShips(ships, id);
    }
  }
};

const colorSunkShips = (ships, id) => {
  ships.forEach(ship => {
    if (ship.shipObject.isSunk()) {
      ship.positions.forEach(array => {
        const [x, y] = array;
        const cell = document.querySelector(`#player-${id}-cell-${x}${y}`);
        cell.style.backgroundColor = 'red';
        cell.style.border = 'solid 1px brown';
      });
    }
  });
};

const darkenCell = (cell) => {
  cell.style.backgroundColor = 'black';
  cell.style.border = 'solid 1px white';
};

export const revealCell = (game, playerId, position) => {
  const x = position[0];
  const y = position[1];
  const cell = document.querySelector(`#player-${playerId}-cell-${x}${y}`);
  const boardCellToken = game['player' + playerId].ownGameboard.board[x][y];
  console.log(boardCellToken);
  cell.style.border = 'solid 1px black';
  if (boardCellToken === 'x') {
    cell.style.border = 'purple';
    cell.style.backgroundColor = 'orange';
  };
  if (boardCellToken === 'm') cell.style.backgroundColor = 'grey';
  colorSunkShips(game['player' + playerId].ownGameboard.ships, playerId);
};

const createBoard = (id, game) => {
  const board1 = document.getElementById(`player-${id}`);
  id === 1 ? board1.textContent = `Player${id}'s Board` : board1.textContent = 'Computer\'s Board'
  ;
  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.id = `player-${id}-cell-${i}${j}`;
      cell.style.width = '30px';
      cell.style.height = '30px';
      cell.style.border = 'solid 1px black';
      // cell.ondrop = (e) => dropHandler(e, game);
      cell.ondrop = (ev) => dropHandler(ev, game);
      cell.ondragover = dragoverHandler;
      if (id === 2) darkenCell(cell);
      row.prepend(cell);
    }
    board1.appendChild(row);
  }
  board1.style.margin = '30px';
};

export const PvEprepareAttackListenerTiles = (game, id) => {
  const arrayOfCells = document.querySelectorAll(`div[id*=player-${id}-cell-]`);
  arrayOfCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const position = getCoordinatesFromTagId(cell, 2);
      game.player1.attackEnemy(game.player2, position);
      revealCell(game, id, position);
      // TODO: REFACTOR... LOGIC OF TURNS WENT INSIDE THIS FUNCTION
      if (checkIfGameEnded(game)) location.reload();
    });
  });
};
