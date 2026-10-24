import { Cardinal } from "#models/Cardinal.js";
import { GameBoard } from "#models/Gameboard.js";
import { Player } from "#models/Player.js";
import { Point } from "#models/Point.js";

describe("class Player", () => {
  it("attack(x, y)", () => {
    const board1 = new GameBoard(10);
    const board2 = new GameBoard(10);
    const p1 = new Player(board1, board2.receiveAttack, true);
    const p2 = new Player(board2, board1.receiveAttack, true);
    board1.placeShip("Carrier", 5, new Point(1, 1), Cardinal.EAST);
    board2.placeShip("Destroyer", 3, new Point(3, 3), Cardinal.SOUTH);
    p1.attack(3, 3);
    expect(p2.board.attacksReceived[0].result).toBe("Destroyer");
    p2.attack(1, 1);
    expect(p1.board.attacksReceived[0].result).toBe("Carrier");
  });
});
