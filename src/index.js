/**
 * The main entry point of the application.
 * @module
 */
console.log("Hello world!");
import { Ship } from "#models/Ship.js";
import { Point } from "#models/Point.js";

let point = new Point(1, 1);

let ship = new Ship(2, point, 1);
console.log(ship.length);
