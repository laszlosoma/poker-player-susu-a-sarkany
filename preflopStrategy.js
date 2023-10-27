function preflopStrategy(game, bet) {
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

  bet(0);
}

module.exports = preflopStrategy;
