const GameState = require("./src/GameState");
const preflopStrategy = require("./preflopStrategy");

class Player {
  static get VERSION() {
    return "0.1";
  }

  static betRequest(gameState, bet) {
    const game = new GameState(gameState);

    const round = game.bettingRound();

    switch (round) {
      case "pre flop":
        preflopStrategy(game, bet);
        return;
      case "flop":
      case "turn":
      default:
        return bet(game.toCall());
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;
