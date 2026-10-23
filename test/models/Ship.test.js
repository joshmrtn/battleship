import { Ship } from "#models/Ship.js";
import { Point } from "#models/Point.js";
import { Cardinal } from "#models/Cardinal.js";

describe("Class Ship", () => {
  describe("constructor", () => {
    test("properties are accessible by getters", () => {
      let newShip = new Ship("Destroyer", 4, new Point(1, 5), Cardinal.NORTH);
      expect(newShip.length).toBe(4);
      expect(newShip.pos.x).toBe(1);
      expect(newShip.pos.y).toBe(5);
      expect(newShip.dir).toBe("NORTH");
      expect(newShip.hitPoints).toBe(4);
      expect(newShip.cells.length).toBe(4);
      expect(newShip.cells[0].x).toBe(1);
      expect(newShip.cells[3].x).toBe(1);
      expect(newShip.cells[0].y).toBe(5);
      expect(newShip.cells[3].y).toBe(2);
    });
    test("calculateCells() builds array of occupied cells", () => {
      const dirs = [
        Cardinal.NORTH,
        Cardinal.EAST,
        Cardinal.SOUTH,
        Cardinal.WEST,
      ];
      for (let i = 0; i < 4; i++) {
        let ship = new Ship(`Ship-${i}`, 4, new Point(5, 5), dirs[i]);
        expect(ship.cells.length).toBe(4);
        expect(ship.cells[0].isEqual(new Point(5, 5))).toBe(true);
        let x = ship.cells[0].x;
        let y = ship.cells[0].y;
        x = dirs[i] === Cardinal.EAST ? x + i : x;
        x = dirs[i] === Cardinal.WEST ? x - i : x;
        y = dirs[i] === Cardinal.NORTH ? y - i : y;
        y = dirs[i] === Cardinal.SOUTH ? y + i : y;
        expect(ship.cells[i].isEqual(new Point(x, y))).toBe(true);
      }
    });
  });
  describe("hit()", () => {
    it("decrements hitpoints", () => {
      let ship = new Ship("test ship", 4, new Point(1, 1), Cardinal.NORTH);
      expect(ship.hitPoints).toBe(4);
      ship.hit();
      expect(ship.hitPoints).toBe(3);
      ship.hit();
      expect(ship.hitPoints).toBe(2);
      ship.hit();
      expect(ship.hitPoints).toBe(1);
      ship.hit();
      expect(ship.hitPoints).toBe(0);
    });
  });
  describe("isSunk()", () => {
    it("returns true if ship is out of hit points", () => {
      let ship = new Ship("test", 4, new Point(1, 1), Cardinal.WEST);
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      expect(ship.isSunk()).toBe(true);
      ship.hit(); // once more for good measure
      expect(ship.isSunk()).toBe(true);
    });
  });
});
