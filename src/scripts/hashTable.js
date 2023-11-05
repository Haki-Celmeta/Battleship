/**
 * Hash table data structure that stores the ship as a key and an id as a value.
 */
class HashTable {
  constructor() {
    this.map = new Map();
    this.id = 1;
  }

  /**Given a ship, it sets an id for that ship
   * 
   * @param {Ship} ship 
   */
  setShipId(ship) {
    this.map.set(ship, this.id++);
  }

  /**Gets the id of the ship
   * 
   * @param {Ship} ship 
   */
  getShipId(ship) {
    return this.map.get(ship);
  }

  /**
   * Returns the key for a given value at hash table data structure, null if value is not found.
   */
  getKeyByValue(searchValue) {
    for (const [key, value] of this.map.entries()) {
      if (value === searchValue) return key;
    }

    return null;
  }
}

export default HashTable;