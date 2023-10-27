"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    static get VERSION() {
        return "0.1";
    }
    static betRequest(gameState, bet) {
        return Math.random() < 0.1 ? bet(gameState.current_buy_in) : bet(0);
    }
    static showdown(gameState) { }
}
exports.default = Player;
