import { describe, expect, test } from '@jest/globals';
import { Gameboard, Ship } from './classes';

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
    test('Gameboard Place ship - Happy Path - 1', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1]];
      expect(gameboard.placeShip(1, positions)).toEqual({ pos: [[0, 1]], ship: { hits: 0, length: 1 } });
    });
    test('Gameboard Place ship - Happy Path - 2', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1], [0, 2]];
      expect(gameboard.placeShip(2, positions)).toEqual({ pos: [[0, 1], [0, 2]], ship: { hits: 0, length: 2 } });
    });
    test('Gameboard Place ship - Happy Path - 3', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1], [0, 2], [0, 3]];
      expect(gameboard.placeShip(3, positions)).toEqual({ pos: [[0, 1], [0, 2], [0, 3]], ship: { hits: 0, length: 3 } });
    });
    test('Gameboard Place ship - Happy Path - 4', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 1], [0, 2], [0, 3], [0, 4]];
      expect(gameboard.placeShip(4, positions)).toEqual({ pos: [[0, 1], [0, 2], [0, 3], [0, 4]], ship: { hits: 0, length: 4 } });
    });
    test('Gameboard Place ship - Length different from amount of positions taken', () => {
      const gameboard = new Gameboard();
      const positions = [[0, 2], [0, 3]];
      const length = 1;
      expect(() => gameboard.placeShip(length, positions)).toThrowError('Incorrect length of ship or amount of tiles taken by ship');
    });

    describe('Position Validation', () => {
      test('Gameboard Place ship - Validation 1', () => {
        const gameboard = new Gameboard();
        const positions = [[10, 1], [0, 2]];
        expect(() => gameboard.placeShip(2, positions)).toThrowError('Ship cannot be placed out of board');
      });

      test('Gameboard Place ship - Validation 2', () => {
        const gameboard = new Gameboard();
        const positions = [[0, -2], [0, 2]];
        expect(() => gameboard.placeShip(2, positions)).toThrowError('Ship cannot be placed out of board');
      });

      test('Gameboard Place ship - Validation 3', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 2], [0, 2]];
        expect(() => gameboard.placeShip(2, positions)).toThrowError('Ship cannot be placed in same tile twice');
      });
      test('Gameboard Place ship - Validation 4', () => {
        const gameboard = new Gameboard();
        const positions = [[0, 2], [0, 3], [0, 4], [0, 2]];
        expect(() => gameboard.placeShip(4, positions)).toThrowError('Ship cannot be placed in same tile twice');
      });

      // TODO: Check validity of ships (correct pos input)
      // TODO: Check if tile is available to place ship
    });
  });
});
