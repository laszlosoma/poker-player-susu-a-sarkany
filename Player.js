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

  static flopStrategy(game, bet) {
    if (
      !this.hasDrill(game) &&
      !this.hasPoker(game) &&
      !this.hasFlush(game) &&
      !this.hasStraight(game) &&
      !this.hasFullHouse(game)
    ) {
      bet(0);
      return;
    }
  }

  static getPairs(game) {
    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    const pairs = values.reduce((acc, curr, array) => {
      if (acc.includes(curr)) {
        return acc;
      }

      if (array.filter((rr) => rr === curr).length === 2) {
        acc.push(curr);
      }
      return acc;
    }, []);

    return pairs;
  }

  static hasPair(gameState) {
    return this.getPairs(gameState).length === 1;
  }

  static has2Pair(gameState) {
    return this.getPairs(gameState).length === 2;
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

  static hasFlush(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const suits = cards.map((c) => c.suit());

    const suit = suits.find((s) => suits.filter((ss) => ss === s).length >= 5);

    return suit;
  }

  static hasStraight(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    const uniqueValues = values.filter((v, i, a) => a.indexOf(v) === i);

    const straight = uniqueValues.find((r) => {
      const index = uniqueValues.indexOf(r);
      return (
        uniqueValues[index + 1] === r - 1 &&
        uniqueValues[index + 2] === r - 2 &&
        uniqueValues[index + 3] === r - 3 &&
        uniqueValues[index + 4] === r - 4
      );
    });

    return straight;
  }

  static hasFullHouse(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    const pair = values.find(
      (r) => values.filter((rr) => rr === r).length === 2
    );

    const cardsWithoutPair = values.filter((r) => r !== pair);

    const drill = cardsWithoutPair.find(
      (r) => cardsWithoutPair.filter((rr) => rr === r).length === 3
    );

    return pair && drill;
  }

  static hasStraightFlush(gameState) {
    const game = new GameState(gameState);

    const cards = game.me().holeCards().concat(game.communityCards());

    const values = cards.map((c) => c.value()).sort((a, b) => b - a);

    const uniqueValues = values.filter((v, i, a) => a.indexOf(v) === i);

    const straight = uniqueValues.find((r) => {
      const index = uniqueValues.indexOf(r);
      return (
        uniqueValues[index + 1] === r - 1 &&
        uniqueValues[index + 2] === r - 2 &&
        uniqueValues[index + 3] === r - 3 &&
        uniqueValues[index + 4] === r - 4
      );
    });

    return straight.find((s) => {
      const cardsOfSuit = cards.filter((c) => c.suit() === s);

      return cardsOfSuit.length >= 5;
    });
  }

  static showdown(gameState) {}
}

module.exports = Player;
