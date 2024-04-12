import { Game } from './classes.js';
import { SHIP_TYPES } from './helpers.js';

const newGame = new Game(true);
console.log('this is newgame ', newGame);

const player = newGame.player1;
const foe = newGame.player2;

player.ownGameboard.placeShip(2, [[0, 0], [1, 0]]);

console.log(player.enemyGameboard.board);

foe.ownGameboard.placeShipRandomPosition(SHIP_TYPES.availableShips.battleship);
foe.ownGameboard.placeShipRandomPosition(SHIP_TYPES.availableShips.cruiser);
foe.ownGameboard.placeShipRandomPosition(SHIP_TYPES.availableShips.submarine);
foe.ownGameboard.placeShipRandomPosition(SHIP_TYPES.availableShips.patrolBoat);

console.log(foe.ownGameboard.board);

// console.log('foe ', foe.ownGameboard.ships.forEach(x => x.positions.forEach(y => console.log(y))));
// console.log('player ', player.enemyGameboard.ships.forEach(x => x.positions.forEach(y => console.log(y))));

console.log('player is attacking foe on 1,6: ', player.attackEnemy(foe, [1, 6]));

console.log('Foe is attacking player on 3,8: ', foe.attackEnemy(player, [3, 8]));

console.log('Foe is attacking player on 0,0: ', foe.attackEnemy(player, [0, 0]));

// const gameloop = () => {
// 1) instantiate player
// if x is true, instantiate player2 on PC
// const newGame = new Game(true);

// 2) populate gameboards for each player

//  depending on whether is a player or computer
// 3) gameloop until allsunk
