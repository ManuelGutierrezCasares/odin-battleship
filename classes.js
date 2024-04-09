import { compareArrays, SHIP_TYPES, TOKENS } from './helpers.js';

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
    this.miss = [];
  }

  placeShip (length, arrOfPos) {
    this.#validateShip(length, arrOfPos);
    this.#validatePositions(arrOfPos);
    this.#validateEmptyTiles(arrOfPos);
    const shipObj = this.#createShipObject(length, arrOfPos);
    this.ships.push(shipObj);
    arrOfPos.forEach(pos => {
      this.#placeTokenOnBoard(TOKENS.ship, pos);
    });

    return shipObj;
  }

  receiveAttack (position) {
    // Correct Usage
    if (!this.#checkPositionFormat(position)) {
      throw new Error('Position format is not correct');
    } else {
      // Validate position inside board
      if (this.#positionOutOfBoard(position)) throw new Error('Cannot attack out of board');
      // Validations
      if (this.#checkTokenTile(TOKENS.hit, position) || this.#checkTokenTile(TOKENS.miss, position)) throw new Error('Tile unavailable');

      // Check for miss hit
      if (this.#checkTokenTile(TOKENS.empty, position)) {
        this.#placeTokenOnBoard(TOKENS.miss, position);
        this.#registerMiss(position);
        return false;
      }
      // Check for ship hit
      if (this.#checkTokenTile(TOKENS.ship, position)) {
        this.#placeTokenOnBoard(TOKENS.hit, position);
        this.#registerShipHit(position);
        return true;
      }
    }
  }

  allSunk () {
    const sunkShips = this.ships.filter(ship => ship.shipObject.isSunk());
    if (sunkShips.length === this.ships.length) return true;
    return false;
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

  #validateShip (length, arrOfPos) {
    // Check if length of ship is different from amount of tiles taken
    if (length !== arrOfPos.length) throw new Error('Incorrect length of ship or amount of tiles taken by ship');

    // Check if length of ship is ok
    if (length > SHIP_TYPES.maxLength || length < SHIP_TYPES.minLength) throw new Error('Ship cannot be bigger than 4 nor smaller than 1');
  }

  #validatePositions (arrOfPos) {
    // Check if same position is placed twice - can be removed if legal check of positions is moved up
    for (let i = 0; i < arrOfPos.length - 1; i++) {
      for (let j = i + 1; j < arrOfPos.length; j++) {
        if (compareArrays(arrOfPos[i], arrOfPos[j])) throw new Error('Ship cannot be placed in same tile twice');
      }
    }

    arrOfPos.forEach(pos => {
      if (this.#positionOutOfBoard(pos)) throw new Error('Ship cannot be placed out of board');
    });

    // Check if Ship positions are legal
    if (arrOfPos.length > SHIP_TYPES.minLength) {
      const direction = arrOfPos[0][0] + 1 === arrOfPos[1][0] ? 'vertical' : 'horizontal';
      for (let i = 0; i < arrOfPos.length - 1; i++) {
        if (!this.#shipPlacement(direction, arrOfPos[i], arrOfPos[i + 1])) throw new Error('Ship must be placed one tile next to other');
      }
    }
  }

  #validateEmptyTiles (arrOfPos) {
    arrOfPos.forEach(pos => {
      // Check if tile is occupied
      if (!this.#checkTokenTile(TOKENS.empty, pos)) throw new Error('Tile is not available');
    });
  }

  #createShipObject (length, arrOfPos) {
    return {
      shipObject: new Ship(length),
      positions: arrOfPos
    };
  }

  #checkTokenTile (token, pos) {
    const x = pos[0]; const y = pos[1];
    if (this.board[x][y] === token) return true;
    return false;
  }

  #shipPlacement (direction, currentTile, nextTile) {
    if (direction === 'vertical' && currentTile[0] + 1 === nextTile[0] && currentTile[1] === nextTile[1]) return true;
    if (direction === 'horizontal' && currentTile[1] + 1 === nextTile[1] && currentTile[0] === nextTile[0]) return true;
    return false;
  }

  #positionOutOfBoard (pos) {
    // Check if ship is out of board
    if ((pos[0] > 9 || pos[1] > 9) || (pos[0] < 0 || pos[1] < 0)) return true;
    return false;
  }

  #checkPositionFormat (position) {
    if (Array.isArray(position) && position.length === 2 && Number.isInteger(position[0]) && Number.isInteger(position[1])) return true;
    return false;
  }

  #placeTokenOnBoard (token, pos) {
    // Place ship on board
    const x = pos[0]; const y = pos[1];
    this.board[x][y] = token;
  }

  #registerMiss (pos) {
    this.miss.push([pos]);
  }

  #registerShipHit (position) {
    this.ships.forEach(ship => {
      ship.positions.forEach(pos => {
        if (compareArrays(pos, position)) ship.shipObject.hit();
      });
    });
  }
}

export class Player {
  // CHECK LOGIC BOTH KEYBOARDS ON EACH PLAYER
  constructor (computer = false) {
    this.isComputer = computer;
    this.ownGameboard = new Gameboard();
    this.enemyGameboard = new Gameboard();
  }

  attackEnemy (player, position) {
    this.enemyGameboard.receiveAttack(position);
    player.ownGameboard.receiveAttack(position);
  }

  // TODO
  gameInit (player) {

  }

  #placeShipRandomPosition (ship) {
    const shipRandomPosition = this.#createRandomPositions(ship.length);
    console.log(shipRandomPosition);
    this.ownGameboard.placeShip(ship.length, shipRandomPosition);
  }

  // REFACTOR
  #createRandomPositions (shipLength) {
    // NEED REFACTOR
    const arrOfPos = [];
    const direction = this.#getRandomDirection() ? 'vertical' : 'horizontal';
    const pos = this.#getRandomStartPosition(10 - shipLength);
    const newPos = pos.toString().split(',');
    newPos.forEach((e, index) => { newPos[index] = Number.parseInt(e); });
    arrOfPos.push(newPos);
    switch (direction) {
      case 'vertical':
        for (let i = 0; i < shipLength - 1; i++) {
          const newPos = [pos[0] += 1, pos[1]];
          arrOfPos.push(newPos);
        }
        break;
      case 'horizontal':
        for (let i = 0; i < shipLength - 1; i++) {
          const newPos = [pos[0], pos[1] += 1];
          arrOfPos.push(newPos);
        }
        break;
      default:
        throw new Error('Wrong direction');
    }
    return arrOfPos;
  }

  #getRandomDirection () {
    return !!Math.round(Math.random());
  }

  // TODO
  #getRandomStartPosition (max) {
    const randomX = Math.floor(Math.random() * max + 1); const randomY = Math.floor(Math.random() * max + 1);
    return [randomX, randomY];
  }
}
