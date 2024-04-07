import { compareArrays, TOKENS } from './helpers.js';

export class Ship {
  constructor (length) {
    this.length = length;
    this.hits = 0;
  }

  isSunk () {
    return this.length - this.hits <= 0;
  }

  hit () {
    if (this.hits >= this.length) {
      throw new Error('Cannot hit because ship is sunk');
    }
    this.hits++;
  }
}

export class Gameboard {
  constructor () {
    this.board = this.#createBoard();
    this.ships = [];
    this.miss = {};
  }

  // DELETE BEFORE DEPLOY
  printGameboard () {
    for (let i = 0; i < 10; i++) {
      console.log('ROW NUMBER ', i);
      let row = '';
      for (let j = 0; j < 10; j++) {
        row += ' | ' + this.board[i][j];
      }
      console.log(row);
    }
  }

  #createBoard () {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const tmp = [];
      for (let j = 0; j < 10; j++) {
        tmp.push(TOKENS.empty);
      }
      board.push(tmp);
    }
    return board;
  }

  placeShip (length, arrOfPos) {
    this.#validateShip(length, arrOfPos);
    this.#validatePosition(arrOfPos);
    const shipObj = {
      ship: new Ship(length),
      pos: arrOfPos
    };
    this.ships.push(shipObj);
    this.#placeShipOnBoard(arrOfPos);
    return shipObj;
  }

  #validateShip (length, arrOfPos) {
    // Check if length of ship is different from amount of tiles taken
    if (length !== arrOfPos.length) throw new Error('Incorrect length of ship or amount of tiles taken by ship');

    // Check if length of ship is ok
    if (length > 4 || length < 1) throw new Error('Ship cannot be bigger than 4 nor smaller than 1');
  }

  #validatePosition (arrOfPos) {
    // Check if same position is placed twice - can be removed if legal check of positions is moved up
    for (let i = 0; i < arrOfPos.length - 1; i++) {
      for (let j = i + 1; j < arrOfPos.length; j++) {
        if (compareArrays(arrOfPos[i], arrOfPos[j])) throw new Error('Ship cannot be placed in same tile twice');
      }
    }

    arrOfPos.forEach(pos => {
      // Check if ship is out of board
      if ((pos[0] > 9 || pos[1] > 9) || (pos[0] < 0 || pos[1] < 0)) throw new Error('Ship cannot be placed out of board');
      // Check if tile is occupied
      if (!this.#tileAvailable(pos)) throw new Error('Tile is not available');
    });

    // Check if Ship positions are legal
    if (arrOfPos.length > 1) {
      const direction = arrOfPos[0][0] + 1 === arrOfPos[1][0] ? 'vertical' : 'horizontal';
      for (let i = 0; i < arrOfPos.length - 1; i++) {
        if (!this.#shipPlacement(direction, arrOfPos[i], arrOfPos[i + 1])) throw new Error('Ship must be placed one tile next to other');
      }
    }
  }

  #tileAvailable (pos) {
    const x = pos[0]; const y = pos[1];
    if (this.board[x][y] === TOKENS.empty) return true;
    return false;
  }

  #shipPlacement (direction, currentTile, nextTile) {
    if (direction === 'vertical' && currentTile[0] + 1 === nextTile[0] && currentTile[1] === nextTile[1]) return true;
    if (direction === 'horizontal' && currentTile[1] + 1 === nextTile[1] && currentTile[0] === nextTile[0]) return true;
    return false;
  }

  #placeShipOnBoard (pos) {
    // Place ship on board
    pos.forEach(e => {
      const x = e[0]; const y = e[1];
      this.board[x][y] = TOKENS.ship;
    });
  }
}

export const gb = new Gameboard();
// console.log(gb);
