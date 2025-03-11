import { deck } from "./deck.js";

class Game {
  deck = [];
  market = [];

  setUpGame() {
    this.deck = deck.shuffle();
    this.market = deck.getCards(5);
    console.log(deck.cards.length);
  }

  startGame() {
    this.setUpGame();
  }
}

const game = new Game();
game.startGame();
