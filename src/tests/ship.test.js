import Ship from '../scripts/ship.js';

const ship = new Ship(5);

test('ship is hit', () => {
  expect(ship.hit()).toEqual(true);
});

test('is Ship sunk', () => {
  expect(ship.isSunk()).toEqual(false);
})

test('total hits', () => {
  expect(ship.hits).toBe(1);
})