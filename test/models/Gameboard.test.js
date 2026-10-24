import { GameBoard } from "#models/Gameboard.js";
import { Point } from "#models/Point.js";
import { Cardinal } from "#models/Cardinal.js";

describe("class GameBoard", () => {
  describe("constructor(sizeX, sizeY)", () => {
    it("creates a grid of the size passed", () => {
      let board = new GameBoard(5, 5);
      expect(board.sizeX).toBe(5);
      expect(board.sizeY).toBe(5);
      let board2 = new GameBoard(10);
      expect(board2.sizeX).toBe(10);
      expect(board2.sizeY).toBe(10);
    });
  });

  describe("receiveAttack(x, y)", () => {
    it("records result of attack received", () => {
      const board = new GameBoard(10);
      const attackResult = board.receiveAttack(1, 3);
      expect(attackResult.result).toBe("MISS");
      board.placeShip("TestShip", 3, new Point(1, 4), Cardinal.EAST);
      expect(board.receiveAttack(1, 4).result).toBe("HIT");
    });
  });

  describe("sendAttack(x, y, receiver)", () => {
    it("sends an attack and records the result", () => {
      const board1 = new GameBoard(10);
      const board2 = new GameBoard(10);

      board1.placeShip("Destroyer", 3, new Point(3, 3), Cardinal.EAST);
      board2.placeShip("Carrier", 5, new Point(5, 5), Cardinal.SOUTH);

      board1.sendAttack(5, 5, board2.receiveAttack);
      expect(board2.ships[0].hitPoints).toBe(4);
      expect(board2.attacksReceived[0].result).toBe("Carrier");
      expect(board1.attacksSent[0].result).toBe("Carrier");

      board2.sendAttack(5, 5, board1.receiveAttack);
      expect(board1.ships[0].hitPoints).toBe(3);
      expect(board1.attacksReceived[0].result).toBe("MISS");
      expect(board2.attacksSent[0].result).toBe("MISS");
    });
  });

  describe("allSunk()", () => {
    it("returns true if all ships sunk, false otherwise", () => {
      const board = new GameBoard(10);
      board.placeShip("test1", 5, new Point(5, 5), Cardinal.EAST);
      board.placeShip("test2", 4, new Point(6, 1), Cardinal.SOUTH);
      expect(board.allSunk()).toBe(false);
      board.receiveAttack(5, 5);
      board.receiveAttack(6, 5);
      board.receiveAttack(7, 5);
      board.receiveAttack(8, 5);
      board.receiveAttack(9, 5);
      expect(board.ships[0].hitPoints).toBe(0);
      expect(board.ships[0].isSunk()).toBe(true);
      expect(board.allSunk()).toBe(false);
      board.receiveAttack(6, 1);
      board.receiveAttack(6, 2);
      board.receiveAttack(6, 3);
      board.receiveAttack(6, 4);
      expect(board.ships[1].hitPoints).toBe(0);
      expect(board.ships[1].isSunk()).toBe(true);
      expect(board.allSunk()).toBe(true);
    });
  });

  describe("placeShip(name, length, pos, dir)", () => {
    it("creates new ship with the passed parameters", () => {
      const board = new GameBoard(10);
      board.placeShip("test", 5, new Point(2, 3), Cardinal.SOUTH);
      expect(board.ships[0].name).toBe("test");
      expect(board.ships[0].pos.x).toBe(2);
      expect(board.ships[0].pos.y).toBe(3);
      expect(board.ships[0].dir).toBe(Cardinal.SOUTH);
    });
  });
});
