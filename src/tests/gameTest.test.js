import Gameboard from "../scripts/gameboard";
import Ship from "../scripts/ship";

test('test 1', () => {
  const board = new Gameboard(6, 6);

  const ship1 = new Ship(5);
  const ship2 = new Ship(4);
  const ship3 = new Ship(3);
  const ship4 = new Ship(4);
  const ship5 = new Ship(2);
  const ship6 = new Ship(3);

  expect(board.shipLocation(ship1, 1, 1, 1, 5)).toBe(true);
  expect(board.shipLocation(ship2, 1, 6, 4, 6)).toBe(true);
  expect(board.shipLocation(ship3, 4, 2, 4, 4)).toBe(true);
  expect(board.shipLocation(ship4, 1, 1, 1, 4)).toBe(false);
  expect(board.shipLocation(ship5, 4, 2, 4, 3)).toBe(false);
  expect(board.shipLocation(ship6, 5, 1, 7, 1)).toBe(false);

  expect(board.receiveAttack(1, 1)).toBe(true);
  expect(board.receiveAttack(2, 6)).toBe(true);
  expect(board.receiveAttack(4, 4)).toBe(true);
  expect(board.receiveAttack(2, 2)).toBe(true);
  expect(ship1.isSunk()).toBe(false);
  expect(board.receiveAttack(6, 6)).toBe(true);
  expect(board.receiveAttack(1, 7)).toBe(false);

  expect(board.board).toEqual(
    [
      ['H', 1, 1, 1, 1, 2],
      [undefined, 'X', undefined, undefined, undefined, 'H'],
      [undefined, undefined, undefined, undefined, undefined, 2],
      [undefined, 3, 3, 'H', undefined, 2],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, 'X'],
    ]
  )

  expect(board.receiveAttack(1, 1)).toBe(false);
  expect(board.receiveAttack(1, 2)).toBe(true);
  expect(board.receiveAttack(1, 3)).toBe(true);
  expect(board.areAllSunk()).toBe(false);
  expect(board.receiveAttack(1, 4)).toBe(true);
  expect(board.receiveAttack(1, 5)).toBe(true);
  expect(ship1.isSunk()).toBe(true);

  expect(board.receiveAttack(1, 6)).toBe(true);
  expect(board.receiveAttack(2, 6)).toBe(false);
  expect(board.receiveAttack(3, 6)).toBe(true);
  expect(board.receiveAttack(4, 6)).toBe(true);
  expect(board.receiveAttack(4, 2)).toBe(true);
  expect(board.areAllSunk()).toBe(false);
  expect(board.receiveAttack(4, 3)).toBe(true);
  expect(board.areAllSunk()).toBe(true);
})