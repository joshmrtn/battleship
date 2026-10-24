/**
 * Represents a player.
 */
export class Player {
  /**
   * Creates a Player
   * @param {GameBoard} board - The GameBoard belonging to the player.
   * @param {function} attackCallback - The function to call when the player chooses to attack. Should be the opponent's GameBoard.receiveAttack()
   * @param {boolean} isCPU - True if player is a computer, false otherwise.
   */
  constructor(board, attackCallback, isCPU = true) {
    this.board = board;
    this.attackCallback = attackCallback;
    this.isCPU = isCPU;
  }

  attack(x, y) {
    this.attackCallback(x, y);
  }
}
