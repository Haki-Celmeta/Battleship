import './styles/main.scss';
import Ship from './scripts/ship.js';
import Gameboard from './scripts/gameboard.js';
import Player from './scripts/Player.js';

const computerPlayer = new Player();
const board = new Gameboard(6, 6);

const ship1 = new Ship(5);
const ship2 = new Ship(4);
const ship3 = new Ship(3);

board.shipLocation(ship1, 1, 1, 1, 5);
board.shipLocation(ship2, 1, 6, 4, 6);
board.shipLocation(ship3, 4, 2, 4, 4);

console.log(computerPlayer.computerAttack(board));
console.log(computerPlayer.computerAttack(board));
console.log(computerPlayer.computerAttack(board));
console.log(computerPlayer.computerAttack(board));
console.log(computerPlayer.computerAttack(board));
console.log(computerPlayer.computerAttack(board));
console.log(board.missedShots);
console.log(board.hitShots);

const computerBoard = computerPlayer.computerPlay(8, 8);

console.log(computerBoard.receiveAttack(2, 4));
console.log(computerBoard.receiveAttack(1, 2));
console.log(computerBoard.receiveAttack(6, 8));
console.log(computerBoard.receiveAttack(8, 1));
console.log(computerBoard.receiveAttack(3, 5));
console.log(computerBoard.receiveAttack(4, 4));