import { describe, expect, test } from '@jest/globals';
import { Gameboard, Player, Ship } from './classes';

describe('Ship Class', () => {
  test('isSunk Function - Happy Path 1', () => {
    const ship = new Ship(0);
    expect(ship.isSunk()).toBe(true);
  });

  test('hit Function - Throw error hits bigger than length', () => {
    const ship = new Ship(1);
    ship.hit();
    expect(() => ship.hit()).toThrowError();
  });
});

describe('Gameboard Class', () => {
  test('Gameboard Array - Check type', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board).toBeInstanceOf(Array);
  });

  test('Gameboard Array - Check rows of board', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board.length).toBe(10);
  });

  test('Gameboard Array - Check total amount of tiles in board', () => {
    const gameboard = new Gameboard();
    const board = gameboard.board.flat();
    expect(board.length).toBe(100);
  });

  describe('Place Ship', () => {
    test('Gameboard Place ship - Happy Path - ship length 1', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1]];
      expect(gameboard.placeShip(1, positions)).toEqual({ positions: [[0, 1]], shipObject: { hits: 0, length: 1 } });
    });
    test('Gameboard Place ship - Happy Path - ship length 2', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1], [0, 2]];
      expect(gameboard.placeShip(2, positions)).toEqual({ positions: [[0, 1], [0, 2]], shipObject: { hits: 0, length: 2 } });
    });
    test('Gameboard Place ship - Happy Path - ship length 3', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1], [0, 2], [0, 3]];
      expect(gameboard.placeShip(3, positions)).toEqual({ positions: [[0, 1], [0, 2], [0, 3]], shipObject: { hits: 0, length: 3 } });
    });
    test('Gameboard Place ship - Happy Path - ship length 4', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1], [0, 2], [0, 3], [0, 4]];
      expect(gameboard.placeShip(4, positions)).toEqual({ positions: [[0, 1], [0, 2], [0, 3], [0, 4]], shipObject: { hits: 0, length: 4 } });
    });
    test('Gameboard Place ship - Happy Path - length higher than 4', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];
      expect(() => gameboard.placeShip(5, positions)).toThrowError('Ship cannot be bigger than 4 nor smaller than 1');
    });
    test('Gameboard Place ship - Happy Path - length smaller than 1', () => {
      const gameboard = new Gameboard();
      const positions = [];
      expect(() => gameboard.placeShip(0, positions)).toThrowError('Ship cannot be bigger than 4 nor smaller than 1');
    });
    test('Gameboard Place ship - Length different from amount of positions taken', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 2], [0, 3]];
      const length = 1;
      expect(() => gameboard.placeShip(length, positions)).toThrowError('Incorrect length of ship or amount of tiles taken by ship');
    });

    // Check pos repetition input
    describe('Position Validation', () => {
      test('Gameboard Place ship - Ship out of board: Validation 1', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 9], [0, 10]];
        expect(() => gameboard.placeShip(2, positions)).toThrowError('Ship cannot be placed out of board');
      });

      test('Gameboard Place ship - Ship out of board: Validation 2', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 1], [-1, 1]];
        expect(() => gameboard.placeShip(2, positions)).toThrowError('Ship cannot be placed out of board');
      });

      test('Gameboard Place ship - Ship position repeated 1', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 2], [0, 2]];
        expect(() => gameboard.placeShip(2, positions)).toThrowError('Ship cannot be placed in same tile twice');
      });
      test('Gameboard Place ship - Ship position repeated 2', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 2], [0, 3], [0, 4], [0, 2]];
        expect(() => gameboard.placeShip(4, positions)).toThrowError('Ship cannot be placed in same tile twice');
      });

      test('Gameboard Place ship - Ship missplaced 1', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 3], [0, 8]];
        expect(() => gameboard.placeShip(2, positions)).toThrowError('Ship must be placed one tile next to other');
      });

      test('Gameboard Place ship - Ship missplaced 2', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 3], [0, 4], [1, 4]];
        expect(() => gameboard.placeShip(3, positions)).toThrowError('Ship must be placed one tile next to other');
      });
    });
  });

  describe('Receive Attack', () => {
    test('Attack - Happy Path - Ship Hit', () => {
      const gameboard = new Gameboard();
      const positions = [0, 2];
      gameboard.placeShip(1, [positions]);
      expect(gameboard.receiveAttack(positions)).toBe(true);
    });

    test('Attack - Happy Path - Missed Hit', () => {
      const gameboard = new Gameboard();
      const positions = [0, 2];
      expect(gameboard.receiveAttack(positions)).toBe(false);
    });

    test('Attack - Position - Wrong position - out of board x', () => {
      const gameboard = new Gameboard();
      const positions = [10, 3];
      expect(() => gameboard.receiveAttack(positions)).toThrowError('Cannot attack out of board');
    });

    test('Attack - Position - Wrong position - out of board y', () => {
      const gameboard = new Gameboard();
      const positions = [0, 30];
      expect(() => gameboard.receiveAttack(positions)).toThrowError('Cannot attack out of board');
    });

    test('Attack - Position - Two positions per turn', () => {
      const gameboard = new Gameboard();
      gameboard.board[0][2] = 's';
      const positions = [[0, 2], [0, 3]];
      expect(() => gameboard.receiveAttack(positions)).toThrowError('Position format is not correct');
    });

    test('Attack - Position - Wrong format', () => {
      const gameboard = new Gameboard();
      gameboard.board[0][2] = 's';
      const positions = ['a', 3];
      expect(() => gameboard.receiveAttack(positions)).toThrowError('Position format is not correct');
    });
  });
  describe('Check All Sunk', () => {
    test('All Gameboard Ships are sunk - Happy Path', () => {
      const gameboard = new Gameboard();
      gameboard.placeShip(2, [[0, 1], [0, 2]]);
      gameboard.placeShip(1, [[0, 7]]);
      gameboard.receiveAttack([0, 1]);
      gameboard.receiveAttack([0, 2]);
      gameboard.receiveAttack([0, 7]);
      expect(gameboard.allSunk()).toBe(true);
    });

    test('All Gameboard Ships are sunk - Not all sunk', () => {
      const gameboard = new Gameboard();
      gameboard.placeShip(2, [[0, 1], [0, 2]]);
      gameboard.placeShip(1, [[0, 7]]);
      gameboard.receiveAttack([0, 1]);
      gameboard.receiveAttack([0, 2]);
      expect(gameboard.allSunk()).toBe(false);
    });

    test('All Gameboard Ships are sunk - None attacked yet', () => {
      const gameboard = new Gameboard();
      gameboard.placeShip(2, [[0, 1], [0, 2]]);
      gameboard.placeShip(1, [[0, 7]]);
      expect(gameboard.allSunk()).toBe(false);
    });
  });
});

describe('Player Class', () => {
  test('Create a Player', () => {
    const player = new Player();
    expect(player).toEqual({ ownGameboard: { board: [['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']], ships: [], miss: [] }, enemyGameboard: { board: [['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']], ships: [], miss: [] } });
  });

  // test('');
});
