import { compareArrays } from './helpers';

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

  printGameboard () {
    for (let i = 0; i < 10; i++) {
      console.log('ROW NUMBER ', i);
      for (let j = 0; j < 10; j++) {
        const tile = this.board[i][j];
        console.log(tile + '|');
      }
      console.log('\n');
    }
  }

  #createBoard () {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const tmp = [];
      for (let j = 0; j < 10; j++) {
        tmp.push(0);
      }
      board.push(tmp);
    }
    return board;
  }

  placeShip (length, arrOfPos) {
    this.#validatePlaceShip(length, arrOfPos);
    const shipObj = {
      ship: new Ship(length),
      pos: arrOfPos
    };
    this.ships.push(shipObj);
    return shipObj;
  }

  #validatePlaceShip (length, arrOfPos) {
    // Check if length of ship is different from amount of tiles taken
    if (length !== arrOfPos.length) throw new Error('Incorrect length of ship or amount of tiles taken by ship');

    // Check if ship is out of board
    arrOfPos.forEach(pos => {
      if ((pos[0] > 9 || pos[1] > 9) || (pos[0] < 0 || pos[1] < 0)) throw new Error('Ship cannot be placed out of board');
    });

    // Check if same position is placed twice
    for (let i = 0; i < arrOfPos.length - 1; i++) {
      for (let j = i + 1; j < arrOfPos.length; j++) {
        if (compareArrays(arrOfPos[i], arrOfPos[j])) throw new Error('Ship cannot be placed in same tile twice');
      }
    }
  }
}

export const gb = new Gameboard();
// console.log(gb);
