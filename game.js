import { Deck, allCards } from "./deck.js";
import { allTokens, allBonusTokens, TokenCollection } from "./tokens.js";
import { Market } from "./market.js";
import { Player } from "./player.js";

class Game {
  constructor() {
    this.deck = [];
    this.market = [];
    this.tokens = [];
    this.bonusTokens = [];
    this.currentPlayerNo = 0;
  }

  changePlayer = () => {
    this.currentPlayerNo = (this.currentPlayerNo + 1) % 2;
    this.currentPlayer = this.players[this.currentPlayerNo];
  };

  initialisePlayerCards() {
    this.players.map((player) => player.initializeHand(this.deck.getCards(5)));
  }

  setUpGame() {
    this.tokens = { ...allTokens };
    this.deck = new Deck(allCards);
    this.deckCards = this.deck.shuffle();
    this.market = new Market(this.deck.getCards(5));
    this.marketCards = this.market.marketCards;
    this.tokenCollection = new TokenCollection(allTokens);
    this.tokens = this.tokenCollection.tokens;
    this.initialisePlayerCards();
    this.currentPlayer = this.players[this.currentPlayerNo];
  }

  displayGame() {
    console.log(`TOKENS : `, this.tokens);
    console.log(`MARKET : ${this.marketCards}`);
    console.log(`CURRENT SCORE : ${this.currentPlayer.score()}`);

    console.log(`HAND : ${this.currentPlayer.hands()}`);
    console.log(`CAMELS : ${this.currentPlayer.camels()}`);
  }

  enrollPlayers() {
    this.players = [new Player("player1"), new Player("player2")];
  }

  isEndOfRound() {
    return this.tokenCollection.are3TokensDeprecated() || this.deck.isEmpty();
  }

  startGame() {
    this.setUpGame();
    this.displayGame();
    while (!this.isEndOfRound()) {}
  }
}

const game = new Game();
game.enrollPlayers();
game.startGame();
