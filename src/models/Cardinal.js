/**
 * Represents a cardinal direction, such as North, East, South, or West.
 */
export class Cardinal {
  static #NORTH = "NORTH";
  static #SOUTH = "SOUTH";
  static #EAST = "EAST";
  static #WEST = "WEST";

  static get NORTH() {
    return this.#NORTH;
  }
  static get SOUTH() {
    return this.#SOUTH;
  }
  static get EAST() {
    return this.#EAST;
  }
  static get WEST() {
    return this.#WEST;
  }
}
