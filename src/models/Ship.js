import { Point } from "#models/Point.js";
import { Cardinal } from "./Cardinal";

/**
 * Represents a ship
 */
export class Ship {
  /**
   * The name of the ship or ship class.
   * @type {string}
   */
  #name;

  /**
   * How many tiles long the ship is.
   * @type {number} */
  #length;

  /**
   * How many more hits the ship can sustain before it is sunk.
   * @type {number}
   */
  #hitPoints;

  /**
   * Which way the ship is pointing.
   * 0=North, 1=East, 2=South, 3=West
   * @type {Cardinal}  */
  #dir;

  /**
   * Where the ship is located. Ships are positioned by their stern.
   * @type {Point}
   */
  #pos;

  /**
   * The cells that this ship occupies.
   * @type {Point[]}
   */
  #cells;

  /**
   * Create a new Ship.
   * @param {string} name - The ship name/class; e.g., "Battleship", "Destroyer", "Carrier", etc.
   * @param {number} length - How many tiles long this ship is.
   * @param {Point} pos - Where the ship is located. Points to the stern of the ship.
   * @param {Cardinal} dir - Which way the ship is pointing.
   */
  constructor(name, length, pos, dir) {
    this.#name = name;
    this.#length = length;
    this.#pos = pos;
    this.#dir = dir;
    // Initialize the ship's cells.
    this.#cells = this.calculateCells();
    this.#hitPoints = this.#length;
  }

  calculateCells() {
    let result = [];
    for (let i = 0; i < this.#length; i++) {
      if (this.#dir === Cardinal.NORTH) {
        result[i] = new Point(this.#pos.x, this.#pos.y - i);
      }
      if (this.#dir === Cardinal.EAST) {
        result[i] = new Point(this.#pos.x + i, this.#pos.y);
      }
      if (this.#dir === Cardinal.SOUTH) {
        result[i] = new Point(this.#pos.x, this.#pos.y + i);
      }
      if (this.#dir === Cardinal.WEST) {
        result[i] = new Point(this.#pos.x - i, this.#pos.y);
      }
    }
    return result;
  }

  /** @type {string} */
  get name() {
    return this.#name;
  }
  /** @type {number} */
  get length() {
    return this.#length;
  }
  /** @type {Cardinal} */
  get dir() {
    return this.#dir;
  }
  /** @type {Point} */
  get pos() {
    return this.#pos;
  }
  /** @type {number} */
  get hitPoints() {
    return this.#hitPoints;
  }

  /**
   * Read-only access to the cells the ship occupies.
   * @type {Point[]}
   */
  get cells() {
    let result = [];
    for (let i = 0; i < this.#length; i++) {
      const cell = this.#cells[i];
      const newPoint = new Point(cell.x, cell.y);
      result.push(newPoint);
    }
    return result;
  }

  /**
   * This ship is hit. Deduct a hit point.
   */
  hit() {
    this.#hitPoints--;
  }

  /**
   * Return true if this ship is sunk.
   * @returns {boolean}
   */
  isSunk() {
    return this.#hitPoints <= 0 ? true : false;
  }
}
