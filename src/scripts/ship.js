import Gameboard from "./gameboard";

/**
 * Creates ship instance with a given length.
 */
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  /**
   * Increments the hits that ship has taken
   * 
   * @returns {boolean}
   */
  hit() {
    this.hits++;
    return true;
  }

  /**
   * Check if damage hit of ship is equal to its length,
   * return true if equal false otherwise
   * 
   * @returns {boolean}
   */
  isSunk() {
    if (this.hits === this.length) return true;
    return false;
  }
}

export default Ship;