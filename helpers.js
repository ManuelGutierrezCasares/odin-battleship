export const compareArrays = (a, b) => {
  // console.log(a, b);
  // console.log(a.toString() === b.toString());
  return a.toString() === b.toString();
};

export const TOKENS = {
  empty: 'o',
  ship: 's',
  hit: 'x',
  miss: 'm'
};

// TODO
export const SHIP_TYPES = {
  availableShips: {
    battleship: {
      amount: 1,
      length: 4
    },
    cruiser: {
      amount: 1,
      length: 3
    },
    submarine: {
      amount: 2,
      length: 2
    },
    patrolBoat: {
      amount: 3,
      length: 1
    }
  },
  maxLength: 4,
  minLength: 1

};
