import { Deck, allCards } from "./deck.js";
import { allTokens, allBonusTokens } from "./tokens.js";
import { Market } from "./market.js";

class Game {
  deck = [];
  market = [];
  players = [
    { name: "Player 1", hand: [], camels: [], tokens: [], excellence: 0 },
    { name: "Player 2", hand: [], camels: [], tokens: [], excellence: 0 },
  ];

  setUpGame() {
    this.deck = new Deck(allCards);
    this.deckCards = this.deck.cards;
    this.market = this.deck.getCards(5);
  }

  startGame() {
    this.setUpGame();
  }
}

const game = new Game();
game.startGame();
