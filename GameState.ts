export type GameState = {
  tournament_id: string;
  game_id: string;
  round: number;
  bet_index: number;
  small_blind: number;
  current_buy_in: number;
  pot: number;
  minimum_raise: number;
  dealer: number;
  orbits: number;
  in_action: number;
  players: PlayerState[];
  community_cards: Card[];
};

type PlayerState = {
  id: number;
  name: string;
  status: string;
  version: string;
  stack: number;
  bet: number;
  hole_cards?: Card[];
};

type Card = {
  rank: Rank;
  suit: Suit;
};

type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";
type Suit = "spades" | "hearts" | "clubs" | "diamonds";

// 1	AA, KK, AKs, QQ, AK	Top 12 Hands
// 2	JJ, TT, 99
// 3	88, 77, AQs, AQ
// 4	66, 55, 44, 33, 22, AJs, ATs, A9s, A8s	Majority Play Hands
// 5	A7s, A6s, A5s, A4s, A3s, A2s, KQs, KQ
// 6	QJs, JTs, T9s, 98s, 87s, 76s, 65s	Suited Connectors

export const shouldEnterGame = (card1: Card, card2: Card): boolean => {
  if (card1.rank === card2.rank) {
    return true;
  }

  if (card1.rank === "A" || card2.rank === "A") {
    return true;
  }

  if (card1.rank === "K" || card2.rank === "K") {
    return true;
  }

  if (card1.rank === "Q" || card2.rank === "Q") {
    return true;
  }

  if (card1.rank === "J" || card2.rank === "J") {
    return true;
  }

  return false;
};
