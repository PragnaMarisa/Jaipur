import { Deck, allCards } from "./deck.js";
import { allTokens, allBonusTokens } from "./tokens.js";
import { Market } from "./market.js";
import { Player } from "./player.js";
import { shuffle } from "./lib.js";

class Game {
  deck = [];
  market = [];
  tokens = [];
  bonusTokens = [];

  initialisePlayerCards() {
    this.players.map((player) => player.initializeHand(this.deck.getCards(5)));
  }

  setUpGame() {
    this.deck = new Deck(allCards);
    this.deckCards = this.deck.shuffle();
    this.market = new Market(this.deck.getCards(5));
    this.initialisePlayerCards();
  }

  enrollPlayers() {
    this.players = [new Player("player1"), new Player("player2")];
  }

  startGame() {
    this.setUpGame();
  }
}

const game = new Game();
game.enrollPlayers();
game.startGame();
