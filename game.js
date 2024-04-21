import { Game } from './classes.js';
import { checkRandomPosition, getRandomPosition } from './helpers.js';
import { display, updateBoard } from './display.js';

export const gameloop = (typeOfGame = false) => {
// 1) instantiate players
  // typeOfGame = true... PvE mode
  // typeOfGame = false... PvP mode
  if (typeOfGame !== true && typeOfGame !== false) throw new Error('Bad usage of Game Mode');
  const game = new Game(typeOfGame);
  console.log(game);
  display(game);
};

export const checkIfGameEnded = (game) => {
  // 3) gameloop
  let winner;

  // check all sunk
  if (game.player2.ownGameboard.allSunk()) {
    winner = 'Player 1';
    updateBoard(game.player1.ownGameboard.board, game.player1.ownGameboard.ships, 1);
    updateBoard(game.player2.ownGameboard.board, game.player2.ownGameboard.ships, 2);
    alert(`${winner} IS THE WINNER!!!!!`);
    return true;
  }
  updateBoard(game.player1.ownGameboard.board, game.player1.ownGameboard.ships, 1);
  updateBoard(game.player2.ownGameboard.board, game.player2.ownGameboard.ships, 2);

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
    updateBoard(game.player1.ownGameboard.board, game.player1.ownGameboard.ships, 1);
    updateBoard(game.player2.ownGameboard.board, game.player2.ownGameboard.ships, 2);
    alert(`${winner} IS THE WINNER!!!!!`);
    return true;
  }

  updateBoard(game.player1.ownGameboard.board, game.player1.ownGameboard.ships, 1);
  updateBoard(game.player2.ownGameboard.board, game.player2.ownGameboard.ships, 2);
};
