import { gb } from './classes.js';
import { TOKENS } from './helpers.js';

console.log(gb.printGameboard());

gb.board[0][7] = TOKENS.hit;

gb.placeShip(2, [[0, 1], [0, 2]]);

gb.placeShip(4, [[4, 5], [4, 6], [4, 7], [4, 8]]);

gb.placeShip(4, [[5, 3], [6, 3], [7, 3], [8, 3]]);

// gb.placeShip(4, [[5, 3], [6, 3], [7, 4], [8, 4]]);

// gb.placeShip(4, [[4, 3], [6, 3], [7, 3], [8, 3]]);

console.log(gb.printGameboard());
