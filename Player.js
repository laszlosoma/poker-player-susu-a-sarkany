const GameState = require("./src/GameState");
const preflopStrategy = require("./preflopStrategy");

class Player {
  static get VERSION() {
    return "0.1";
  }

  static betRequest(gameState, bet) {
    const game = new GameState(gameState);
    bet(game.me().stack());

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

  static hasPair(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const ranks = cards.map((c) => c.rank());

    const pair = ranks.find((r) => ranks.filter((rr) => rr === r).length === 2);

    return !!pair;
  }

  static showdown(gameState) {}
}

module.exports = Player;
