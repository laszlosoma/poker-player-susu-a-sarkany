import { GameState } from "./GameState";

export default class Player {
  static get VERSION() {
    return "0.1";
  }

  static betRequest(gameState: GameState, bet: (amount: number) => void) {
    return Math.random() < 0.1 ? bet(gameState.current_buy_in) : bet(0);
  }

  static showdown(gameState: GameState) {}
}
