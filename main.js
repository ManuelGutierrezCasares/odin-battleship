import { Player } from './classes.js';
import { SHIP_TYPES } from './helpers.js';

const player = new Player();
const foe = new Player(true);

console.log('this is player ', player);
console.log('this is foe ', foe);

foe.placeShipRandomPosition(SHIP_TYPES.availableShips.battleship);

player.attackEnemy(foe, [2, 3]);

console.log('this is player ', player);
console.log('this is foe ', foe);

/* console.log(player, foe);
console.log(JSON.stringify(player));

player.ownGameboard.placeShip(3, [[0, 0], [0, 1], [0, 2]]);
foe.enemyGameboard.placeShip(3, [[0, 0], [0, 1], [0, 2]]);
player.ownGameboard.placeShip(2, [[7, 0], [7, 1]]);
foe.enemyGameboard.placeShip(2, [[7, 0], [7, 1]]);

foe.ownGameboard.placeShip(3, [[3, 4], [3, 5], [3, 6]]);
player.enemyGameboard.placeShip(3, [[3, 4], [3, 5], [3, 6]]);

player.attackEnemy(foe, [7, 9]);
foe.attackEnemy(player, [0, 0]);

console.log('this is player own gameboard ', player.ownGameboard);
console.log('this is player enemy gameboard ', player.enemyGameboard);
console.log('this is foe own gameboard ', foe.ownGameboard);
console.log('this is foe enemy gameboard ', foe.enemyGameboard);

console.log(JSON.stringify(player.ownGameboard) === JSON.stringify(foe.enemyGameboard));
console.log(JSON.stringify(player.enemyGameboard) === JSON.stringify(foe.ownGameboard));
console.log(JSON.stringify(player.ownGameboard) === JSON.stringify(foe.ownGameboard)); */

/*
gb.placeShip(2, [[0, 1], [0, 2]]);

gb.placeShip(4, [[4, 5], [4, 6], [4, 7], [4, 8]]);

gb.placeShip(4, [[5, 3], [6, 3], [7, 3], [8, 3]]);

gb.receiveAttack([0, 2]);

gb.receiveAttack([0, 3]);

gb.receiveAttack([5, 7]);
gb.receiveAttack([6, 7]);

gb.receiveAttack([4, 5]);
gb.receiveAttack([4, 6]);
gb.receiveAttack([4, 7]);
gb.receiveAttack([4, 8]);

console.log(gb);

console.log('Ships are all sunk? ', gb.allSunk());

gb.receiveAttack([5, 3]);
gb.receiveAttack([6, 3]);
gb.receiveAttack([7, 3]);
gb.receiveAttack([8, 3]);

console.log('Ships are all sunk? ', gb.allSunk());

gb.receiveAttack([0, 1]);
console.log('Ships are all sunk? ', gb.allSunk());
*/
