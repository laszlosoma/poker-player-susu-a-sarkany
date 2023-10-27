"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const Player_1 = __importDefault(require("./Player"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "1337", 10);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    const { action, game_state } = req.body;
    switch (action) {
        case "version":
            res.send(Player_1.default.VERSION);
            break;
        case "bet_request":
            Player_1.default.betRequest(JSON.parse(game_state), function (bet) {
                res.json(bet);
            });
            break;
        case "showdown":
            Player_1.default.showdown(JSON.parse(game_state));
            res.send("Ok");
            break;
        case "check":
            res.send("Ok");
            break;
        default:
            res.send("Unknown action");
    }
});
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server listening at: localhost:${port}`);
});
