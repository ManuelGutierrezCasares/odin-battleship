import { Game } from './classes.js';
import { convertUserInputToPosition, checkRandomPosition, getRandomPosition, getShipsToPlace, SHIP_TYPES } from './helpers.js';
import { updateBoard } from './display.js';

export const gameloop = (typeOfGame = false) => {
// 1) instantiate players
  // typeOfGame = true... PvE mode
  // typeOfGame = false... PvP mode
  if (typeOfGame !== true && typeOfGame !== false) throw new Error('Bad usage of Game Mode');
  const game = new Game(typeOfGame);
  console.log(game);

  // 2) populate gameboards for each player
  // PvE Mode
  const shipsToPlaceArray = getShipsToPlace(SHIP_TYPES);

  // Populate gameboard
  if (typeOfGame === true) {
    // PvE MODE
    while (shipsToPlaceArray.length !== 0) {
      // user input position

      // Prompt usage x,y-x,y-x,y-...
      const shipLength = shipsToPlaceArray.shift();
      const userInput = prompt(`Insert position to place ship of ${shipLength} blocks`);
      const userInputPosition = convertUserInputToPosition(userInput);
      game.player1.ownGameboard.placeShip(shipLength, userInputPosition);
      game.player2.ownGameboard.placeShipRandomPosition(shipLength);
    }
  } else {
    // PvP MODE
    while (shipsToPlaceArray.length !== 0) {
      // user input position

      // Prompt usage x,y-x,y-x,y-...
      const shipLength = shipsToPlaceArray.shift();

      const player1Input = prompt(`Player 1: Insert position to place ship of ${shipLength} blocks`);
      const player1InputPosition = convertUserInputToPosition(player1Input);
      game.player1.ownGameboard.placeShip(shipLength, player1InputPosition);

      const player2Input = prompt(`Player 2: Insert position to place ship of ${shipLength} blocks`);
      const player2InputPosition = convertUserInputToPosition(player2Input);
      game.player2.ownGameboard.placeShip(shipLength, player2InputPosition);
    }
  }
  updateBoard(game.player1.ownGameboard.board, 1);
  updateBoard(game.player2.ownGameboard.board, 2);

  //  depending on whether is a player or computer
  // 3) gameloop
  let winner;
  if (typeOfGame === true) {
    // PvE MODE
    while (true) {
      // P1 attack Computer
      const player1Attack = prompt('Player 1: Insert position to hit');
      const player1AttackPosition = convertUserInputToPosition(player1Attack)[0];
      game.player1.attackEnemy(game.player2, player1AttackPosition);
      // check all sunk
      if (game.player2.ownGameboard.allSunk()) {
        winner = 'Player 1';
        break;
      }
      updateBoard(game.player1.ownGameboard.board, 1);
      updateBoard(game.player2.ownGameboard.board, 2);
      // Computer attack P1
      let randomPositionToAttack = getRandomPosition();
      while (true) {
        if (checkRandomPosition(game.player1, randomPositionToAttack)) break;
        randomPositionToAttack = getRandomPosition();
      }

      game.player2.attackEnemy(game.player1, randomPositionToAttack);
      // check all sunk
      if (game.player1.ownGameboard.allSunk()) {
        winner = 'Player 2';
        break;
      }
      updateBoard(game.player1.ownGameboard.board, 1);
      updateBoard(game.player2.ownGameboard.board, 2);
    }
  } else {
    // PvP MODE
    while (true) {
      // P1 attack P2
      const player1Attack = prompt('Player 1: Insert position to hit');
      const player1AttackPosition = convertUserInputToPosition(player1Attack)[0];
      console.log('player 1 attack ', player1Attack);
      console.log('player 1 attack position ', player1AttackPosition);
      game.player1.attackEnemy(game.player2, player1AttackPosition);
      // check all sunk
      if (game.player2.ownGameboard.allSunk()) {
        winner = 'Player 1';
        break;
      }
      // P2 attack P1
      const player2Attack = prompt('Player 2: Insert position to hit');
      const player2AttackPosition = convertUserInputToPosition(player2Attack)[0];
      game.player2.attackEnemy(game.player1, player2AttackPosition);
      // check all sunk
      if (game.player1.ownGameboard.allSunk()) {
        winner = 'Player 2';
        break;
      }
    }
  }
  updateBoard(game.player1.ownGameboard.board, 1);
  updateBoard(game.player2.ownGameboard.board, 2);
  console.log(game);
  alert(`${winner} IS THE WINNER!!!!!`);
};
