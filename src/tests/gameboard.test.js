import Gameboard from "../scripts/gameboard";

test('test 1', () => {
  const gameboard = new Gameboard(4, 4);

  expect(gameboard.receiveAttack(1, 1)).toBe(true);
  expect(gameboard.receiveAttack(1, 4)).toBe(true);
  expect(gameboard.receiveAttack(3, 3)).toBe(true);
  expect(gameboard.receiveAttack(1, 5)).toBe(false);
  expect(gameboard.receiveAttack(0, 2)).toBe(false);
  expect(gameboard.receiveAttack(-1, 5)).toBe(false);
  expect(gameboard.missedShots).toBe(3);
  expect(gameboard.board).toEqual(
    [
      ['X', undefined, undefined, 'X'],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, 'X', undefined],
      [undefined, undefined, undefined, undefined]
    ]
  )
})