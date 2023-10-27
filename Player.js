const GameState = require("./src/GameState");

class Player {
  static get VERSION() {
    return "0.1";
  }

  static betRequest(gameState, bet) {
    return;

    const game = new GameState(gameState);

    if (game.me().hasPocketPair()) {
      bet(game.toRaise());
      return;
    }

    const highest = game.me().highestPocketValue();
    const lowest = game.me().lowestPocketValue();

    if (game.me().hasPocketSuited()) {
      if (highest === 15) {
        // ACE
        bet(game.toRaise());
        return;
      }

      if (highest === 14 || highest == 13) {
        // KING, QUEEN
        if (lowest > 8) {
          bet(game.toRaise());
          return;
        }
      }

      if (highest === 12) {
        // JACK
        if (lowest > 9) {
          bet(game.toRaise());
          return;
        }
      }
    } else {
      if (highest === 15) {
        // ACE
        if (lowest > 8) {
          bet(game.toRaise());
          return;
        }
      }

      if (highest === 14) {
        // KING
        if (lowest > 9) {
          bet(game.toRaise());
          return;
        }
      }

      if (highest === 13) {
        // QUEEN
        if (lowest > 10) {
          bet(game.toRaise());
          return;
        }
      }
    }

    return bet(0);
  }

  static showdown(gameState) {}
}

module.exports = Player;
