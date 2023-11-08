import HashTable from "./hashTable.js";

/**
 * Creates a gameboard for battleship with given height and width.
 */
class Gameboard {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.board = this._createBoard();
    this.missedShots = 0;
    this.hitShots = 0;
    this.data = new HashTable();
  }

  /**
   * Creates the battleship board everytime is called
   * 
   * @returns {Array}
   */
  _createBoard() {
    const array = [];

    for (let i = 0; i < this.height; i++) {
      array[i] = [];
      for (let j = 0; j < this.width; j++) {
        array[i][j] = undefined;
      }
    }

    return array;
  }

  /**
   * Check if give coordinates are either horizontal or vertical.
   * True if horizontal, false if vertical.
   * 
   * @param {number} y1 
   * @param {number} x1 
   * @param {number} y2 
   * @param {number} x2 
   * @returns {boolean}
   */
  _isHorizontal(y1, x1, y2, x2) {
    if (y1 === y2) return true;
    if (x1 === x2) return false;
  }

  /**
   * Increment hitShots everytime is called
   */
  _increaseHitsShots() {
    this.hitShots++;
  }

  /**
   * Increment missedShots everytime is called
   */
  _increaseMissedShots() {
    this.missedShots++;
  }

  /**
   * Return true if given cell is undefined (cell has no ship or missed shots), 
   * false if cell is not undefined (cell has ship or has received attack before)
   * 
   * @returns {boolean}
   */
  isCellUndefined(cell) {
    return cell === undefined;
  }

  /**
   * Check if given ship coordinates are inside gameboard parametres. True if they are, false if not.
   * 
   * @param {number} y1 
   * @param {number} x1 
   * @param {number} y2 
   * @param {number} x2 
   * @returns {boolean}
   */
  isCoordinationCorrect(y1, x1, y2, x2) {
    const isCorrect = ((y1 < this.height && x1 < this.width) && (y1 >= 0 && x1 >= 0)) &&
      ((y2 < this.height && x2 < this.width) && (y2 >= 0 && x2 >= 0));
    return isCorrect;
  }

  /**
   * Check if given ship coordinates override another ship coordinates. 
   * True if they override or coordinations are not inside gameboard, false if not.
   * 
   * @param {number} y1  
   * @param {number} x1 
   * @param {number} y2 
   * @param {number} x2 
   * @returns {boolean}
   */
  isOverriding(y1, x1, y2, x2) {
    const horizontal = this._isHorizontal(y1, x1, y2, x2);
    const minY = Gameboard.min([y1, y2]);
    const maxY = Gameboard.max([y1, y2]);
    const minX = Gameboard.min([x1, x2]);
    const maxX = Gameboard.max([x1, x2]);
    if (!this.isCoordinationCorrect(y1, x1, y2, x2)) return true;

    if (horizontal) {
      for (let col = minX; col <= maxX; col++) {
        if (!this.isCellUndefined(this.board[minY][col])) return true;
      }
    } else if (!horizontal) {
      for (let row = minY; row <= maxY; row++) {
        if (!this.isCellUndefined(this.board[row][minX])) return true;
      }
    }

    return false;
  }

  /**
   * Return true if attack coordinate is within gameboard, false if it is not.
   * 
   * @param {number} y - coordinate in y-axis
   * @param {number} x - coordinate in x-axis
   * @returns {boolean}
   */
  isAttackWithinBoard(y, x) {
    return (y < this.height && x < this.width) && (y >= 0 && x >= 0);
  }

  /**
   * Return true if attack coordinate override previous attack, false if not.
   * 
   * @param {number} y - coordinate in y-axis
   * @param {number} x - coordinate in x-axis
   * @returns {boolean}
   */
  isAttackOverriding(y, x) {
    return this.board[y][x] === 'X' || this.board[y][x] === 'H';
  }

  /**
   * Return true if given cell type is a number, false if it is not a number.
   * 
   * @param {number} cell 
   * @returns {boolean}
   */
  isCellNumber(cell) {
    return typeof cell === 'number';
  }

  /**
   * Gets the correct ship instance and calls hit method. Place that ship instance to the same key and value.
   * 
   * @param {number} value 
   */
  changeHitsForShip(value) {
    const ship = this.data.getKeyByValue(value);
    ship.hit();
    this.data.map.set(ship, value);
  }

  /**
   * It takes x and y coordination for attack.
   * 
   * @param {number} h - y (height) coordinate
   * @param {number} w - x (width) coordinate
   * @returns {boolean} true if ship is hit, false otherwise
   */
  receiveAttack(h, w) {
    const y = Gameboard.decrementNumber(h);
    const x = Gameboard.decrementNumber(w);

    if (this.isAttackWithinBoard(y, x)) {
      if (this.isAttackOverriding(y, x)) return false;

      if (this.isCellNumber(this.board[y][x])) {
        this.changeHitsForShip(this.board[y][x]);
        this._increaseHitsShots();
        this.board[y][x] = 'H';
        return true;
      }

      if (this.isCellUndefined(this.board[y][x])) {
        this._increaseMissedShots();
        this.board[y][x] = 'X';
        return true;
      }
    }

    return false;
  }

  /**
   * Sets the ship to given coordinates in gameboard. True if it is placed, false if something went wrong.
   * 
   * @param {Ship} ship 
   * @param {number} h1 
   * @param {number} w1 
   * @param {number} h2 
   * @param {number} w2 
   * @returns {boolean}
   */
  shipLocation(ship, h1, w1, h2, w2) {
    const y1 = Gameboard.decrementNumber(h1);
    const x1 = Gameboard.decrementNumber(w1);
    const y2 = Gameboard.decrementNumber(h2);
    const x2 = Gameboard.decrementNumber(w2);

    if (!this.isCoordinationCorrect(y1, x1, y2, x2)) return false;
    if (this.isOverriding(y1, x1, y2, x2)) return false;

    this.data.setShipId(ship);
    const horizontal = this._isHorizontal(y1, x1, y2, x2);

    if (horizontal) {
      for (let col = x1; col <= x2; col++) {
        this.board[y1][col] = this.data.getShipId(ship);
      }
    } else if (!horizontal) {
      for (let row = y1; row <= y2; row++) {
        this.board[row][x1] = this.data.getShipId(ship);
      }
    }

    return true;
  }

  /**
   * Check if all the ships have sunk. True if they are, false if there still ships.
   * 
   * @returns {boolean}
   */
  areAllSunk() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.isCellNumber(this.board[i][j])) return false;
      }
    }

    return true;
  }

  /**
   * Decrement a number by 1
   * 
   * @param {number} number 
   * @returns {number} 
   */
  static decrementNumber(number) {
    return number - 1;
  }

  /**
   * Increment the given number by 1.
   * 
   * @param {number} number 
   * @returns {number}
   */
  static incrementNumber(number) {
    return number + 1;
  }

  /**
   * Return the maximum of a given array
   * 
   * @param {array} array 
   */
  static max(array) {
    return Math.max(...array);
  }

  /**
   * Return the minimum of a given array
   * 
   * @param {array} array 
   */
  static min(array) {
    return Math.min(...array);
  }
}

export default Gameboard;