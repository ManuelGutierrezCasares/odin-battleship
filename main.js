import { gb } from './classes.js';
console.log(gb.printGameboard());

gb.board[0][7] = 'x';

console.log(gb.printGameboard());
