import { GameState, shouldEnterGame } from "./GameState";

export default class Player {
  static get VERSION() {
    return "0.1";
  }

  static betRequest(gameState: GameState, bet: (amount: number) => void) {
    if (gameState.in_action === undefined) {
      return bet(0);
    }

    const currentPlayer = gameState.players[gameState.in_action];

    if (currentPlayer.hole_cards === undefined) {
      return bet(0);
    }

    const shouldEnter = shouldEnterGame(
      currentPlayer.hole_cards[0],
      currentPlayer.hole_cards[1]
    );

    if (shouldEnter) {
      return bet(gameState.current_buy_in * 2);
    }

    return Math.random() > 0.9
      ? bet(0)
      : bet(gameState.current_buy_in - currentPlayer.bet);
  }

  static showdown(gameState: GameState) {}
}
