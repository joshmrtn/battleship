/**
 * Represents a point (ordered pair) on the game board.
 */
export class Point {
  /**
   * Create a new point.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns true if other point is equal to this one, false otherwise.
   * @param {Point} other - A Point object to compare.
   * @returns {boolean}
   */
  isEqual(other) {
    if (!(other instanceof Point)) return false;
    if (this.x === other.x && this.y === other.y) return true;
    return false;
  }
}
