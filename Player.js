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

  static hasPair(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    const pair = values.find(
      (r) => values.filter((rr) => rr === r).length === 2
    );

    return pair;
  }

  static has2Pair(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    // const pairs = values.filter(
    //   (r) => values.filter((rr) => rr === r).length === 2
    // );

    const pairs = values.reduce((acc, curr, array) => {
      if (array.filter((rr) => rr === curr).length === 2) {
        acc.push(curr);
      }
      return acc;
    }, []);

    return pair;
  }

  static hasDrill(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    const pair = values.find(
      (r) => values.filter((rr) => rr === r).length === 3
    );

    return pair;
  }

  static hasPoker(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    const pair = values.find(
      (r) => values.filter((rr) => rr === r).length === 4
    );

    return pair;
  }

  static showdown(gameState) {}
}

module.exports = Player;
