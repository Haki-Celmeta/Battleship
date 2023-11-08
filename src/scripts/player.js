import Gameboard from "./gameboard";
import Ship from "./ship";

/**
 * Creates computer player with ships placed randomly.
 */
class Player {
  constructor(height, width) {
    this.computerBoard = new Gameboard(height, width);
  }

  /**
   * Return random number from 0 to a given maximum(length).
   * 
   * @param {number} length 
   * @returns {number}
   */
  random(length) {
    return Math.floor(Math.random() * length);
  }

  /**
   * Return an array with random y-axis and x-axis based on height and width of gameboard.
   */
  randomCoordination(board) {
    const y = this.random(board.height);
    const x = this.random(board.width);

    return [y, x];
  }

  /**
   * Return a random boolean
   * 
   * @returns {boolean}
   */
  randomBoolean() {
    const number = this.random(2);
    return number === 0 ? false : true;
  }

  /**
   * Computer receive a random attack on a given gameboard, puts H if cell is number, X if undefined.
   * 
   * @param {Gameboard} board 
   * @returns {boolean}
   */
  computerAttack(board) {
    if (board === null || board === undefined) return false;

    const [y, x] = this.randomCoordination(board);

    if (board.isAttackOverriding(y, x)) this.computerAttack(board);

    const h = Gameboard.incrementNumber(y);
    const w = Gameboard.incrementNumber(x);
    board.receiveAttack(h, w);

    return true;
  }

  /**
   * It check for both gameboard parameters and if ship coordinations override another ship.
   * True if coordinations are correct, false if not.
   * 
   * @param {number} y1 
   * @param {number} x1 
   * @param {number} y2 
   * @param {number} x2 
   * @returns {boolean}
   */
  coordinationCheck(y1, x1, y2, x2) {
    return this.computerBoard.isCoordinationCorrect(y1, x1, y2, x2) && !this.computerBoard.isOverriding(y1, x1, y2, x2);
  }

  /**
   * Return random coordinates on gameboard for a given ship.
   * 
   * @param {Ship} ship 
   */
  randomShipCoordinates(ship) {
    const [y, x] = this.randomCoordination(this.computerBoard);
    const isHorizontal = this.randomBoolean();

    const xRight = x + (ship.length - 1);
    const xLeft = x - (ship.length - 1);
    const yDown = y + (ship.length - 1);
    const yUp = y - (ship.length - 1);

    if (isHorizontal) {
      if (this.coordinationCheck(y, x, y, xRight)) return [y + 1, x + 1, y + 1, xRight + 1];
      if (this.coordinationCheck(y, xLeft, y, x)) return [y + 1, xLeft + 1, y + 1, x + 1];
    } else {
      if (this.coordinationCheck(y, x, yDown, x)) return [y + 1, x + 1, yDown + 1, x + 1];
      if (this.coordinationCheck(yUp, x, y, x)) return [yUp + 1, x + 1, y + 1, x + 1];
    }

    return this.randomShipCoordinates(ship);
  }

  /**
   * Creates and places the ships on the gameboard randomly
   */
  computerShips() {
    const ship1 = new Ship(6);
    const ship2 = new Ship(5);
    const ship3 = new Ship(4);
    const ship4 = new Ship(3);
    const ship5 = new Ship(2);

    const [h1Ship1, w1Ship1, h2Ship1, w2Ship1] = this.randomShipCoordinates(ship1);
    this.computerBoard.shipLocation(ship1, h1Ship1, w1Ship1, h2Ship1, w2Ship1);

    const [h1Ship2, w1Ship2, h2Ship2, w2Ship2] = this.randomShipCoordinates(ship2);
    this.computerBoard.shipLocation(ship2, h1Ship2, w1Ship2, h2Ship2, w2Ship2);

    const [h1Ship3, w1Ship3, h2Ship3, w2Ship3] = this.randomShipCoordinates(ship3);
    this.computerBoard.shipLocation(ship3, h1Ship3, w1Ship3, h2Ship3, w2Ship3);

    const [h1Ship4, w1Ship4, h2Ship4, w2Ship4] = this.randomShipCoordinates(ship4);
    this.computerBoard.shipLocation(ship4, h1Ship4, w1Ship4, h2Ship4, w2Ship4);

    const [h1Ship5, w1Ship5, h2Ship5, w2Ship5] = this.randomShipCoordinates(ship5);
    this.computerBoard.shipLocation(ship5, h1Ship5, w1Ship5, h2Ship5, w2Ship5);

    return this.computerBoard;
  }
}

export default Player;