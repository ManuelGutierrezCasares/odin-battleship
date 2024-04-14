export const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};

export const TOKENS = {
  empty: 'o',
  ship: 's',
  hit: 'x',
  miss: 'm'
};

export const SHIP_TYPES = {
  availableShips: {
    battleship: {
      amount: 0,
      length: 4
    },
    cruiser: {
      amount: 0,
      length: 3
    },
    submarine: {
      amount: 0,
      length: 2
    },
    patrolBoat: {
      amount: 1,
      length: 1
    }
  },
  maxLength: 4,
  minLength: 1

};

export const getShipsToPlace = (obj) => {
  const ships = [];

  const tmp = Object.values(obj.availableShips);
  tmp.forEach(shipType => {
    while (shipType.amount !== 0) {
      ships.push(shipType.length);
      shipType.amount--;
    }
  });
  return ships;
};

export const convertUserInputToPosition = (string) => {
  return string.split('-')
    .map((e) => e.split(',')
      .map(Number));
};

export const getRandomPosition = () => {
  const randomX = Math.floor(Math.random() * 10); const randomY = Math.floor(Math.random() * 10);
  return [randomX, randomY];
};

export const checkRandomPosition = (player, pos) => {
  const x = pos[0]; const y = pos[1];
  return !!((player.ownGameboard.board[x][y] === 'o' || player.ownGameboard.board[x][y] === 's'));
};
