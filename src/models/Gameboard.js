import { Point } from "#models/Point.js";
import { Ship } from "#models/Ship.js";

/**
 * Represents a game board.
 * In a game of Battleship, each player has their own game board,
 * and each game board is made up of two grids: the primary grid, and the
 * target grid.  
 *
 * The primary grid is where the player positions their own ships.  
 * The target grid is where the player tracks the cells that the player has shot at.
 */
export class GameBoard {
  /** @type {Ship[]} */
  #ships;

  /** @type {{x: number, y: number, result: string}[]} */
  #attacksReceived;
  /** @type {{x: number, y: number, result: string}[]} */
  #attacksSent;

  #sizeX;
  #sizeY;

  constructor(sizeX, sizeY = null) {
    this.#sizeY = !sizeY ? sizeX : sizeY;
    this.#sizeX = sizeX;
    this.#ships = [];
    this.#attacksReceived = [];
    this.#attacksSent = [];
  }

  get sizeX() {
    return this.#sizeX;
  }
  get sizeY() {
    return this.#sizeY;
  }

  get ships() {
    return this.#ships;
  }

  get attacksReceived() {
    return this.#attacksReceived;
  }

  get attacksSent() {
    return this.#attacksSent;
  }

  /**
   * Receive an attack from the opposing player, recording the result
   * (hit or miss). If hit, calls that ship's hit() method.
   * @returns {{result: string, name: string|undefined}}
   */
  receiveAttack = (x, y) => {
    let hitShip = this.#shipAt(x, y);
    if (hitShip) {
      hitShip.hit();
      this.recordAttackReceived(x, y, hitShip.name);
      return { result: "HIT", name: hitShip.name };
    } else {
      this.recordAttackReceived(x, y, "MISS");
      return { result: "MISS" };
    }
  };

  recordAttackReceived(x, y, result) {
    this.#attacksReceived.push({ x, y, result });
  }

  recordAttackSent(x, y, result) {
    this.#attacksSent.push({ x, y, result });
  }

  /**
   * Returns the Ship object at x, y on this player's game board,
   * or null if there is no ship there.
   * @returns {Ship|null}
   */
  #shipAt(x, y) {
    for (let ship of this.#ships) {
      if (ship.occupies(new Point(x, y))) return ship;
    }
    return null;
  }

  /**
   * Records an attack on the opposing player, calling the opposing
   * player's receiveAttack and recording the result (hit or miss).
   * @param {number} x - X coordinate to attack.
   * @param {number} y - Y coordinate to attack.
   * @param {function} receiver - The receiving player's gameboard's receiveAttack method.
   */
  sendAttack(x, y, receiver) {
    const result = receiver(x, y);
    if (result.result === "HIT") {
      this.recordAttackSent(x, y, result.name);
    } else if (result.result === "MISS") {
      this.recordAttackSent(x, y, "MISS");
    }
  }

  /**
   * Place a new ship on the player's primary board.
   * @param {string} name
   * @param {number} length
   * @param {Point} pos
   * @param {Cardinal} dir
   */
  placeShip(name, length, pos, dir) {
    // TODO add validation that ships are within the bounds of the grid.
    const ship = new Ship(name, length, pos, dir);
    this.#ships.push(ship);
  }

  /**
   * Returns true if all this player's ships are sunk, false otherwise.
   * @returns {boolean}
   */
  allSunk() {
    for (let ship of this.#ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
}
