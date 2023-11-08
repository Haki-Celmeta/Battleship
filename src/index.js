import './styles/main.scss';
import Ship from './scripts/ship.js';
import Gameboard from './scripts/gameboard.js';
import Player from './scripts/Player.js';

const computerPlayer = new Player(10, 10);
const board = new Gameboard(10, 10);

const ship1 = new Ship(5);
const ship2 = new Ship(4);
const ship3 = new Ship(3);

// board.shipLocation(ship1, 7, 8, 10, 8);
// board.shipLocation(ship2, 1, 6, 4, 6);
// board.shipLocation(ship3, 4, 2, 4, 4);
// console.log(board.isOverriding(9, 5, 9, 6));

// console.log(computerPlayer.computerAttack(board));
// console.log(computerPlayer.computerAttack(board));
// console.log(computerPlayer.computerAttack(board));
// console.log(computerPlayer.computerAttack(board));
// console.log(computerPlayer.computerAttack(board));
// console.log(computerPlayer.computerAttack(board));
// console.log(board.missedShots);
// console.log(board.hitShots);
// console.log(board);

const computerBoard = computerPlayer.computerShips();
console.log(computerBoard);

// console.log(computerBoard.receiveAttack(2, 4));
// console.log(computerBoard.receiveAttack(1, 2));
// console.log(computerBoard.receiveAttack(6, 8));
// console.log(computerBoard.receiveAttack(8, 1));
// console.log(computerBoard.receiveAttack(3, 5));
// console.log(computerBoard.receiveAttack(4, 4));
// console.log(computerBoard.receiveAttack(10, 9));
// console.log(computerBoard.receiveAttack(1, 1));
// console.log(computerBoard.receiveAttack(0, 2));
// console.log(computerBoard.receiveAttack(11, 7));